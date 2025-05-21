import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, TextField, Alert, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EmployeeSupervisor } from "../Apis/employeeBossApi";
import { useState, useEffect } from "react";
import { Boss, fetchBosses } from "../Apis/employeeApi";

// Utilidad para formatear fecha a YYYY-MM-DD
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "No registrada";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toISOString().slice(0, 10);
};

export default function EmployeeBossInfo({
  bossInfo,
  onUpdate,
}: {
  bossInfo: EmployeeSupervisor;
  onUpdate: (updated: EmployeeSupervisor) => Promise<void>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(bossInfo);
  const [error, setError] = useState<string | null>(null);
  const [bosses, setBosses] = useState<Boss[]>([]);

  useEffect(() => {
    const fetchBossesData = async () => {
      try {
        const data: Boss[] = await fetchBosses();
        setBosses(data);
      } catch (error) {
        console.error("Error al obtener la lista de jefes:", error);
      }
    };
    fetchBossesData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name as string]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const validateFields = () => {
    if (!form.supervisor_id || !form.start_date) {
      setError("Por favor, completa todos los campos obligatorios.");
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
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E6E6FA" }}>
        <Typography variant="h6" sx={{ color: "#7C3AED", fontWeight: "bold" }}>
          Información de Jefe Directo
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {editMode ? (
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Columna de edición */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                required
                select
                label="Jefe"
                name="supervisor_id"
                value={form.supervisor_id}
                onChange={handleChange}
              >
                {bosses.map((boss) => (
                  <MenuItem key={boss.id} value={boss.id}>
                    {boss.full_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label="Fecha de Inicio"
                name="start_date"
                type="date"
                value={form.start_date || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Fecha de Fin"
                name="end_date"
                type="date"
                value={form.end_date || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <Box>
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={!!form.active}
                    onChange={handleCheckboxChange}
                  />
                  Activo
                </label>
              </Box>
              {error && <Alert severity="error">{error}</Alert>}
              <Button onClick={handleSave} variant="contained" color="success">Guardar</Button>
              <Button onClick={() => { setEditMode(false); setError(null); }} color="inherit">Cancelar</Button>
            </Box>
            {/* Columna de referencia */}
            <Box sx={{
              flex: 1,
              background: "#F3F4F6",
              borderRadius: 2,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 220
            }}>
              <Typography variant="subtitle2" color="text.secondary">Valores actuales</Typography>
              <Typography><strong>Jefe actual:</strong> {bosses.find(b => b.id === bossInfo.supervisor_id)?.full_name || "No asignado"}</Typography>
              <Typography>
                <strong>Fecha de Inicio:</strong>{" "}
                {formatDate(bossInfo.start_date)}
              </Typography>
              <Typography>
                <strong>Fecha de Fin:</strong>{" "}
                {formatDate(bossInfo.end_date)}
              </Typography>
              <Typography><strong>Activo:</strong> {bossInfo.active ? "Sí" : "No"}</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>ID del Supervisor:</strong> {bossInfo.supervisor_id}</Typography>
            <Typography>
              <strong>Fecha de Inicio:</strong>{" "}
              {formatDate(bossInfo.start_date)}
            </Typography>
            <Typography>
              <strong>Fecha de Fin:</strong>{" "}
              {formatDate(bossInfo.end_date)}
            </Typography>
            <Typography><strong>Activo:</strong> {bossInfo.active ? "Sí" : "No"}</Typography>
            <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">Editar</Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}