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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField required label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} />
            <TextField required label="Apellido" name="last_name" value={form.last_name} onChange={handleChange} />
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
            <TextField required label="Teléfono" name="phone_number" value={form.phone_number} onChange={handleChange} />
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
        ) : beneficiary ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>Nombre:</strong> {beneficiary.first_name} {beneficiary.last_name}</Typography>
            <Typography><strong>Fecha de Nacimiento:</strong> {beneficiary.birth_date}</Typography>
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