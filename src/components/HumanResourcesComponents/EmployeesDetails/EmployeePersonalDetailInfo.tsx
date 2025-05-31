import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const MAX_CURP_LENGTH = 18;
const MAX_RFC_LENGTH = 13;
const MAX_NSS_LENGTH = 11;

const CARD_OPTIONS = ["Santander", "Ban Bajío"];
const GENDER_OPTIONS = ["Masculino", "Femenino"];
const MARITAL_STATUS_OPTIONS = ["Soltero", "Casado", "Divorciado", "Unión Libre", "Viudo"];


// Función para permitir solo números
function onlyNumbers(str: string) {
  return str.replace(/\D/g, "");
}

export default function EmployeePersonalInfo({ personalInfo, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
const [form, setForm] = useState({
  ...personalInfo,
  curp: personalInfo?.curp || "", // Asegurar que sea una cadena vacía
  rfc: personalInfo?.rfc || "",  // Asegurar que sea una cadena vacía
  nss: personalInfo?.nss || "",  // Asegurar que sea una cadena vacía
  cardname: personalInfo?.cardname || "",
  is_card: !!personalInfo?.is_card,
});
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo de confirmación

  const numberFields = ["nss"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (numberFields.includes(name)) {
      setForm({ ...form, [name]: onlyNumbers(value) });
    } else if (["curp", "rfc"].includes(name)) {
      setForm({ ...form, [name]: value.toUpperCase() }); // Solo mayúsculas
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const validateFields = () => {
    if (
      !form.gender?.trim() ||
      !form.marital_status?.trim() ||
      !form.birth_date?.trim()
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    if (form.curp && form.curp.length > MAX_CURP_LENGTH) {
      setError(`La CURP no puede tener más de ${MAX_CURP_LENGTH} caracteres.`);
      return false;
    }
    if (form.rfc && form.rfc.length > MAX_RFC_LENGTH) {
      setError(`El RFC no puede tener más de ${MAX_RFC_LENGTH} caracteres.`);
      return false;
    }
    if (form.nss && form.nss.length > MAX_NSS_LENGTH) {
      setError(`El NSS no puede tener más de ${MAX_NSS_LENGTH} caracteres.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
    setOpenDialog(true); // Abrir el diálogo de confirmación
  };

  const confirmSave = async () => {
    await onUpdate(form);
    setEditMode(false);
    setOpenDialog(false); // Cerrar el diálogo después de guardar
  };


// Utilidad para formatear fecha a YYYY-MM-DD
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "No registrada";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toISOString().slice(0, 10);
};


  const handleEditMode = () => {
  setForm({
    ...personalInfo,
    birth_date: formatDate(personalInfo.birth_date), // Formatear la fecha de nacimiento
  });
  setEditMode(true);
};





  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
          <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
            Información Personal
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {editMode ? (
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Columna de edición */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
  label="CURP"
  name="curp"
  value={form.curp || ""} // Asegurar que sea una cadena vacía
  onChange={handleChange}
  inputProps={{ maxLength: MAX_CURP_LENGTH }}
  helperText={`${form.curp?.length || 0}/${MAX_CURP_LENGTH}`} // Manejo seguro de length
/>
                <TextField
  label="RFC"
  name="rfc"
  value={form.rfc || ""} // Asegurar que sea una cadena vacía
  onChange={handleChange}
  inputProps={{ maxLength: MAX_RFC_LENGTH }}
  helperText={`${form.rfc?.length || 0}/${MAX_RFC_LENGTH}`} // Manejo seguro de length
/>
                <TextField
                  required
                  select
                  label="Género"
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  select
                  label="Estado Civil"
                  name="marital_status"
                  value={form.marital_status || ""}
                  onChange={handleChange}
                >
                  {MARITAL_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  label="Fecha de Nacimiento"
                  name="birth_date"
                  type="date"
                  value={form.birth_date || ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
  label="NSS"
  name="nss"
  value={form.nss || ""} // Asegurar que sea una cadena vacía
  onChange={handleChange}
  inputProps={{
    maxLength: MAX_NSS_LENGTH,
    inputMode: "numeric",
    pattern: "[0-9]*",
  }}
  helperText={`${form.nss?.length || 0}/${MAX_NSS_LENGTH}`} // Manejo seguro de length
/>
                <Box>
                  <label>
                    <input
                      type="checkbox"
                      name="is_card"
                      checked={!!form.is_card}
                      onChange={handleCheckboxChange}
                    />
                    ¿Tiene Tarjeta?
                  </label>
                </Box>
                <TextField
                  select
                  label="Nombre de la Tarjeta"
                  name="cardname"
                  value={form.cardname || ""}
                  onChange={handleChange}
                  disabled={!form.is_card}
                >
                  {CARD_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}
                <Button onClick={handleSave} variant="contained" color="success">
                  Guardar
                </Button>
                <Button onClick={() => { setEditMode(false); setError(null); }} color="inherit">
                  Cancelar
                </Button>
              </Box>
              {/* Columna de referencia */}
              <Box
                sx={{
                  flex: 1,
                  background: "#F3F4F6",
                  borderRadius: 2,
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minWidth: 220,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Valores actuales
                </Typography>
                <Typography><strong>CURP:</strong> {personalInfo.curp || "No registrado"}</Typography>
                <Typography><strong>RFC:</strong> {personalInfo.rfc || "No registrado"}</Typography>
                <Typography><strong>Género:</strong> {personalInfo.gender}</Typography>
                <Typography><strong>Estado Civil:</strong> {personalInfo.marital_status}</Typography>
                <Typography><strong>Fecha de Nacimiento:</strong> {formatDate(personalInfo.birth_date)}</Typography>
                <Typography><strong>NSS:</strong> {personalInfo.nss || "No registrado"}</Typography>
                <Typography><strong>¿Tiene Tarjeta?</strong> {personalInfo.is_card ? "Sí" : "No"}</Typography>
                <Typography><strong>Nombre de la Tarjeta:</strong> {personalInfo.cardname || "No tiene"}</Typography>
              </Box>
            </Box>
          ) : personalInfo ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography><strong>CURP:</strong> {personalInfo.curp || "No registrado"}</Typography>
              <Typography><strong>RFC:</strong> {personalInfo.rfc || "No registrado"}</Typography>
              <Typography><strong>Género:</strong> {personalInfo.gender}</Typography>
              <Typography><strong>Estado Civil:</strong> {personalInfo.marital_status}</Typography>
              <Typography><strong>Fecha de Nacimiento:</strong> {formatDate(personalInfo.birth_date)}</Typography>
              <Typography><strong>NSS:</strong> {personalInfo.nss || "No registrado"}</Typography>
              <Typography><strong>¿Tiene Tarjeta?</strong> {personalInfo.is_card ? "Sí" : "No"}</Typography>
              <Typography><strong>Nombre de la Tarjeta:</strong> {personalInfo.cardname || "No tiene"}</Typography>
              <Button onClick={handleEditMode} variant="outlined" color="primary">
  Editar
</Button>
            </Box>
          ) : (
            <Typography>No hay información personal disponible.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Guardado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas guardar los cambios realizados?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={confirmSave} variant="contained" color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}