import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, TextField, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Employee } from "../Apis/employeeApi";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    if (
      !form.first_name?.trim() ||
      !form.last_name_paterno?.trim() ||
      !form.last_name_materno?.trim() ||
      !form.work_area_id ||
      !form.salary ||
      !form.hire_date?.trim()
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validateFields() || !onUpdate) return;
    await onUpdate(form);
    setEditMode(false);
  };

  if (!employeeInfo) return null;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
        <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
          Información General
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {editMode ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField required label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} />
            <TextField label="Segundo Nombre" name="second_name" value={form.second_name || ""} onChange={handleChange} />
            <TextField required label="Apellido Paterno" name="last_name_paterno" value={form.last_name_paterno} onChange={handleChange} />
            <TextField required label="Apellido Materno" name="last_name_materno" value={form.last_name_materno} onChange={handleChange} />
            <TextField required label="Área de Trabajo" name="work_area_id" value={form.work_area_id} onChange={handleChange} />
            <TextField required label="Salario" name="salary" type="number" value={form.salary} onChange={handleChange} />
            <TextField required label="Fecha de Ingreso" name="hire_date" type="date" value={form.hire_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Fecha de Alta Nss" name="nss_date" type="date" value={form.nss_date || ""} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            {error && <Alert severity="error">{error}</Alert>}
            <Button onClick={handleSave} variant="contained" color="success">Guardar</Button>
            <Button onClick={() => { setEditMode(false); setError(null); }} color="inherit">Cancelar</Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>ID:</strong> {employeeInfo.id}</Typography>
            <Typography><strong>Jefe:</strong> {employeeInfo.is_boss ? "Sí" : "No"}</Typography>
            <Typography><strong>Planta:</strong> {employeeInfo.plant_id}</Typography>
            <Typography><strong>Nombre:</strong> {employeeInfo.first_name} {employeeInfo.second_name || ""}</Typography>
            <Typography><strong>Apellidos:</strong> {employeeInfo.last_name_paterno} {employeeInfo.last_name_materno}</Typography>
            <Typography><strong>Área de Trabajo:</strong> {employeeInfo.work_area_id}</Typography>
            <Typography><strong>Salario:</strong> {employeeInfo.salary}</Typography>
            <Typography><strong>Fecha de Ingreso:</strong> {employeeInfo.hire_date}</Typography>
            <Typography><strong>Fecha de Alta Nss:</strong> {employeeInfo.nss_date}</Typography>
            {onUpdate && <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">Editar</Button>}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}