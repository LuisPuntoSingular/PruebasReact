import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, TextField, Alert, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const MAX_CURP_LENGTH = 18;
const MAX_RFC_LENGTH = 13;
const MAX_NSS_LENGTH = 11;

const CARD_OPTIONS = [
  "Santander",
  "Ban Bajío",
];

const GENDER_OPTIONS = [
  "Masculino",
  "Femenino",
];

const MARITAL_STATUS_OPTIONS = [
  "Soltero",
  "Casado",
  "Divorciado",
  "Unión Libre",
  "Viudo",
];

export default function EmployeePersonalInfo({ personalInfo, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    ...personalInfo,
    curp: personalInfo?.curp || "",
    rfc: personalInfo?.rfc || "",
    nss: personalInfo?.nss || "",
    cardname: personalInfo?.cardname || "",
    is_card: !!personalInfo?.is_card,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    await onUpdate(form);
    setEditMode(false);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
        <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
          Información Personal
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {editMode ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField
              label="CURP"
              name="curp"
              value={form.curp || ""}
              onChange={handleChange}
              inputProps={{ maxLength: MAX_CURP_LENGTH }}
              helperText={`${form.curp.length}/${MAX_CURP_LENGTH}`}
            />
            <TextField
              label="RFC"
              name="rfc"
              value={form.rfc || ""}
              onChange={handleChange}
              inputProps={{ maxLength: MAX_RFC_LENGTH }}
              helperText={`${form.rfc.length}/${MAX_RFC_LENGTH}`}
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
                <MenuItem key={option} value={option}>{option}</MenuItem>
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
                <MenuItem key={option} value={option}>{option}</MenuItem>
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
              value={form.nss || ""}
              onChange={handleChange}
              inputProps={{ maxLength: MAX_NSS_LENGTH }}
              helperText={`${form.nss.length}/${MAX_NSS_LENGTH}`}
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
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            {error && <Alert severity="error">{error}</Alert>}
            <Button onClick={handleSave} variant="contained" color="success">Guardar</Button>
            <Button onClick={() => { setEditMode(false); setError(null); }} color="inherit">Cancelar</Button>
          </Box>
        ) : personalInfo ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>CURP:</strong> {personalInfo.curp || "No registrado"}</Typography>
            <Typography><strong>RFC:</strong> {personalInfo.rfc || "No registrado"}</Typography>
            <Typography><strong>Género:</strong> {personalInfo.gender}</Typography>
            <Typography><strong>Estado Civil:</strong> {personalInfo.marital_status}</Typography>
            <Typography><strong>Fecha de Nacimiento:</strong> {personalInfo.birth_date}</Typography>
            <Typography><strong>NSS:</strong> {personalInfo.nss || "No registrado"}</Typography>
            <Typography><strong>¿Tiene Tarjeta?</strong> {personalInfo.is_card ? "Sí" : "No"}</Typography>
            <Typography><strong>Nombre de la Tarjeta:</strong> {personalInfo.cardname || "No tiene"}</Typography>
            <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">Editar</Button>
          </Box>
        ) : (
          <Typography>No hay información personal disponible.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}