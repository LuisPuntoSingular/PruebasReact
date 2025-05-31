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
import { useState, useEffect } from "react";
import { Employee } from "../Apis/employeeApi";
import { getAllWorkAreas, WorkArea } from "../Apis/employeeWorkAreasApi";

// Función para capitalizar solo la primera letra de cada palabra
function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function EmployeeGeneralInfo({
  employeeInfo,
  onUpdate,
}: {
  employeeInfo: Employee;
  onUpdate?: (updated: Employee) => Promise<void>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(employeeInfo);
  const [error, setError] = useState<string | null>(null);
  const [workAreas, setWorkAreas] = useState<WorkArea[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el diálogo de confirmación

  useEffect(() => {
    const fetchWorkAreas = async () => {
      try {
        const areas = await getAllWorkAreas();
        setWorkAreas(areas);
      } catch (error) {
        console.error("Error al obtener las áreas de trabajo:", error);
        setWorkAreas([]);
      }
    };
    fetchWorkAreas();
  }, []);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  if (name === "hire_date" || name === "nss_date") {
    // Permitir valores vacíos para los campos de fecha
    setForm({ ...form, [name]: value || "" });
  } else if (name === "is_boss") {
    setForm({ ...form, [name]: value === "Sí" });
  } else if (name === "work_area_id") {
    setForm({ ...form, [name]: Number(value) });
  } else if (
    ["first_name", "second_name", "last_name_paterno", "last_name_materno"].includes(name)
  ) {
    setForm({ ...form, [name]: toTitleCase(value) });
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const validateFields = () => {
    if (
      !form.first_name?.trim() ||
      !form.last_name_paterno?.trim() ||
      !form.last_name_materno?.trim() ||
      !form.work_area_id ||
      !form.salary ||
      !form.hire_date?.trim() ||
      !form.nss_date?.trim()
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validateFields() || !onUpdate) return;
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
    ...employeeInfo,
    hire_date: formatDate(employeeInfo.hire_date) || "", // Si no hay fecha, usa una cadena vacía
    nss_date: formatDate(employeeInfo.nss_date) || "",   // Si no hay fecha, usa una cadena vacía
  });
  setEditMode(true);
};


const formatDateForDisplay = (dateStr?: string) => {
  if (!dateStr) return "No registrada"; // Mostrar "No registrada" si no hay fecha
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "No registrada"; // Manejar fechas inválidas
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const year = d.getFullYear();
  return `${day}/${month}/${year}`; // Formato dd/mm/yyyy
};



  if (!employeeInfo) return null;
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
          <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
            Información General
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {editMode ? (
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Columna de edición */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  select
                  label="Jefe"
                  name="is_boss"
                  value={form.is_boss ? "Sí" : "No"}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Sí">Sí</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
                <TextField required label="Planta" name="plant_id" value={form.plant_id || ""} onChange={handleChange} />
                <TextField required label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} />
                <TextField label="Segundo Nombre" name="second_name" value={form.second_name || ""} onChange={handleChange} />
                <TextField required label="Apellido Paterno" name="last_name_paterno" value={form.last_name_paterno} onChange={handleChange} />
                <TextField label="Apellido Materno" name="last_name_materno" value={form.last_name_materno} onChange={handleChange} />
                <TextField
                  required
                  select
                  label="Área de Trabajo"
                  name="work_area_id"
                  value={form.work_area_id || ""}
                  onChange={handleChange}
                >
                  {workAreas.map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.work_area_name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField required label="Salario" name="salary" type="number" value={form.salary} onChange={handleChange} />
                <TextField required label="Fecha de Ingreso" name="hire_date" type="date" value={form.hire_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                <TextField required label="Fecha de Alta Nss" name="nss_date" type="date" value={form.nss_date || ""} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                <TextField
                  required
                  select
                  label="Estatus"
                  name="status"
                  value={form.status ? "Activo" : "Inactivo"}
                  onChange={(e) => {
                    const value = e.target.value === "Activo";
                    setForm({ ...form, status: value });
                  }}
                >
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
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
                <Typography><strong>ID:</strong> {employeeInfo.id}</Typography>
                <Typography><strong>Jefe:</strong> {employeeInfo.is_boss ? "Sí" : "No"}</Typography>
                <Typography><strong>Planta:</strong> {employeeInfo.plant_id}</Typography>
                <Typography><strong>Nombre:</strong> {employeeInfo.first_name} {employeeInfo.second_name || ""}</Typography>
                <Typography><strong>Apellidos:</strong> {employeeInfo.last_name_paterno} {employeeInfo.last_name_materno}</Typography>
                <Typography>
                  <strong>Área de Trabajo:</strong>{" "}
                  {workAreas.find((a) => a.id === employeeInfo.work_area_id)?.work_area_name || employeeInfo.work_area_id}
                </Typography>
                <Typography><strong>Salario:</strong> {employeeInfo.salary}</Typography>
<Typography><strong>Fecha de Ingreso:</strong> {formatDateForDisplay(employeeInfo.hire_date)}</Typography>
<Typography><strong>Fecha de Alta Nss:</strong> {formatDateForDisplay(employeeInfo.nss_date)}</Typography>
                <Typography><strong>Estatus:</strong> {employeeInfo.status ? "Activo" : "Inactivo"}</Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography><strong>ID:</strong> {employeeInfo.id}</Typography>
              <Typography><strong>Jefe:</strong> {employeeInfo.is_boss ? "Sí" : "No"}</Typography>
              <Typography><strong>Planta:</strong> {employeeInfo.plant_id}</Typography>
              <Typography><strong>Nombre:</strong> {employeeInfo.first_name} {employeeInfo.second_name || ""}</Typography>
              <Typography><strong>Apellidos:</strong> {employeeInfo.last_name_paterno} {employeeInfo.last_name_materno}</Typography>
              <Typography>
                <strong>Área de Trabajo:</strong>{" "}
                {workAreas.find((a) => a.id === employeeInfo.work_area_id)?.work_area_name || employeeInfo.work_area_id}
              </Typography>
              <Typography><strong>Salario:</strong> {employeeInfo.salary}</Typography>
<Typography><strong>Fecha de Ingreso:</strong> {formatDateForDisplay(employeeInfo.hire_date)}</Typography>
<Typography><strong>Fecha de Alta Nss:</strong> {formatDateForDisplay(employeeInfo.nss_date)}</Typography>
              <Typography><strong>Estatus:</strong> {employeeInfo.status ? "Activo" : "Inactivo"}</Typography>
              {onUpdate && (
                <Button onClick={handleEditMode} variant="outlined" color="primary">
  Editar
</Button>
              )}
            </Box>
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