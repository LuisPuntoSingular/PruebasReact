import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, TextField, Alert, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Beneficiary } from "../Apis/employeeBeneficiaryApi";

const RELATIONSHIP_OPTIONS = [
  "Abuela/o",
  "Amiga/o",
  "Concubina/o",
  "Cuñada/o",
  "Esposa/o",
  "Hermana/o",
  "Hija/o",
  "Madrastra",
  "Madre",
  "Padrastro",
  "Padre",
  "Pareja",
  "Prima/o",
  "Sobrina/o",
  "Suegra/o",
  "Tía/o",
  "Otro",
];

// Utilidad para formatear fecha a YYYY-MM-DD
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "No registrada";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toISOString().slice(0, 10);
};

// Función para capitalizar solo la primera letra de cada palabra
function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Función para permitir solo números
function onlyNumbers(str: string) {
  return str.replace(/\D/g, "");
}

export default function EmployeeBeneficiaryInfo({
  beneficiary,
  onUpdate,
}: {
  beneficiary: Beneficiary;
  onUpdate: (updated: Beneficiary) => Promise<void>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(beneficiary);
  const [error, setError] = useState<string | null>(null);

  // Campos que deben ser solo números
  const numberFields = ["phone_number", "percentage"];

  // Campos que deben tener buena ortografía (capitalización)
  const titleCaseFields = ["first_name", "last_name", "relationship"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (numberFields.includes(name)) {
      setForm({ ...form, [name]: onlyNumbers(value) });
    } else if (titleCaseFields.includes(name)) {
      setForm({ ...form, [name]: toTitleCase(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateFields = () => {
    if (
      !form.first_name?.trim() ||
      !form.last_name?.trim() ||
      !form.birth_date?.trim() ||
      !form.relationship?.trim() ||
      !form.phone_number?.trim() ||
      form.percentage === undefined || form.percentage === null ||
      form.percentage < 0 || form.percentage > 100
    ) {
      setError("Por favor, completa todos los campos obligatorios y asegúrate que el porcentaje esté entre 0 y 100.");
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
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E6F4EA" }}>
        <Typography variant="h6" sx={{ color: "#10B981", fontWeight: "bold" }}>
          Datos de Beneficiario
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {editMode ? (
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Columna de edición */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                required
                label="Nombre"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
              />
              <TextField
                required
                label="Apellido"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />
              <TextField
                required
                label="Fecha de Nacimiento"
                name="birth_date"
                type="date"
                value={form.birth_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                required
                select
                label="Parentesco"
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
              >
                {RELATIONSHIP_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label="Teléfono"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                required
                label="Porcentaje"
                name="percentage"
                type="number"
                value={form.percentage}
                onChange={handleChange}
                inputProps={{ min: 0, max: 100 }}
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button onClick={handleSave} variant="contained" color="success">Guardar</Button>
              <Button onClick={() => { setEditMode(false); setError(null); }} color="inherit">Cancelar</Button>
            </Box>
            {/* Columna de referencia en gris claro */}
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
              <Typography><strong>Nombre:</strong> {beneficiary.first_name}</Typography>
              <Typography><strong>Apellido:</strong> {beneficiary.last_name}</Typography>
              <Typography><strong>Fecha de Nacimiento:</strong> {formatDate(beneficiary.birth_date)}</Typography>
              <Typography><strong>Parentesco:</strong> {beneficiary.relationship}</Typography>
              <Typography><strong>Teléfono:</strong> {beneficiary.phone_number}</Typography>
              <Typography><strong>Porcentaje:</strong> {beneficiary.percentage}%</Typography>
            </Box>
          </Box>
        ) : beneficiary ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>Nombre:</strong> {beneficiary.first_name} {beneficiary.last_name}</Typography>
            <Typography><strong>Fecha de Nacimiento:</strong> {formatDate(beneficiary.birth_date)}</Typography>
            <Typography><strong>Parentesco:</strong> {beneficiary.relationship}</Typography>
            <Typography><strong>Teléfono:</strong> {beneficiary.phone_number}</Typography>
            <Typography><strong>Porcentaje:</strong> {beneficiary.percentage}%</Typography>
            <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">Editar</Button>
          </Box>
        ) : (
          <Typography>No hay información de beneficiario disponible.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}