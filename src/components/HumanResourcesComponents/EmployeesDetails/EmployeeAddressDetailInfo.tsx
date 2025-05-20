import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, TextField, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddressContact } from "../Apis/employeeAdressContactApi";
import { useState } from "react";

export default function EmployeeAddressInfo({ addressContact, onUpdate }: {
  addressContact: AddressContact;
  onUpdate: (updated: AddressContact) => Promise<void>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(addressContact);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    if (
      !form.postal_code.trim() ||
      !form.neighborhood.trim() ||
      !form.state.trim() ||
      !form.municipality.trim() ||
      !form.street_and_number.trim() ||
      !form.phone_number.trim()
    ) {
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
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#FFF7E6" }}>
        <Typography variant="h6" sx={{ color: "#F59E0B", fontWeight: "bold" }}>
          Dirección y Contacto
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {editMode ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField required label="Código Postal" name="postal_code" value={form.postal_code} onChange={handleChange} />
            <TextField required label="Colonia" name="neighborhood" value={form.neighborhood} onChange={handleChange} />
            <TextField required label="Estado" name="state" value={form.state} onChange={handleChange} />
            <TextField required label="Municipio" name="municipality" value={form.municipality} onChange={handleChange} />
            <TextField required label="Calle y Número" name="street_and_number" value={form.street_and_number} onChange={handleChange} />
            <TextField required label="Teléfono" name="phone_number" value={form.phone_number} onChange={handleChange} />
            <TextField label="Email" name="email" value={form.email || ""} onChange={handleChange} />
            {error && <Alert severity="error">{error}</Alert>}
            <Button onClick={handleSave} variant="contained" color="success">Guardar</Button>
            <Button onClick={() => { setEditMode(false); setError(null); }} color="inherit">Cancelar</Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>Código Postal:</strong> {addressContact.postal_code}</Typography>
            <Typography><strong>Colonia:</strong> {addressContact.neighborhood}</Typography>
            <Typography><strong>Estado:</strong> {addressContact.state}</Typography>
            <Typography><strong>Municipio:</strong> {addressContact.municipality}</Typography>
            <Typography><strong>Calle y Número:</strong> {addressContact.street_and_number}</Typography>
            <Typography><strong>Teléfono:</strong> {addressContact.phone_number}</Typography>
            <Typography><strong>Email:</strong> {addressContact.email}</Typography>
            <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">Editar</Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}