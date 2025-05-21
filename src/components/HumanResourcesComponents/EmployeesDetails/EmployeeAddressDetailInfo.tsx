import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, TextField, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddressContact } from "../Apis/employeeAdressContactApi";
import { useState } from "react";

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

export default function EmployeeAddressInfo({ addressContact, onUpdate }: {
  addressContact: AddressContact;
  onUpdate: (updated: AddressContact) => Promise<void>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(addressContact);
  const [error, setError] = useState<string | null>(null);

  // Campos que deben ser solo números
  const numberFields = ["postal_code", "phone_number"];

  // Campos que deben tener buena ortografía (capitalización)
  const titleCaseFields = [
    "neighborhood",
    "state",
    "municipality",
    "street_and_number"
  ];

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
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Columna de edición */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                required
                label="Código Postal"
                name="postal_code"
                value={form.postal_code}
                onChange={handleChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                required
                label="Colonia"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
              />
              <TextField
                required
                label="Estado"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
              <TextField
                required
                label="Municipio"
                name="municipality"
                value={form.municipality}
                onChange={handleChange}
              />
              <TextField
                required
                label="Calle y Número"
                name="street_and_number"
                value={form.street_and_number}
                onChange={handleChange}
              />
              <TextField
                required
                label="Teléfono"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                label="Email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
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
              <Typography><strong>Código Postal:</strong> {addressContact.postal_code}</Typography>
              <Typography><strong>Colonia:</strong> {addressContact.neighborhood}</Typography>
              <Typography><strong>Estado:</strong> {addressContact.state}</Typography>
              <Typography><strong>Municipio:</strong> {addressContact.municipality}</Typography>
              <Typography><strong>Calle y Número:</strong> {addressContact.street_and_number}</Typography>
              <Typography><strong>Teléfono:</strong> {addressContact.phone_number}</Typography>
              <Typography><strong>Email:</strong> {addressContact.email || "No registrado"}</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography><strong>Código Postal:</strong> {addressContact.postal_code}</Typography>
            <Typography><strong>Colonia:</strong> {addressContact.neighborhood}</Typography>
            <Typography><strong>Estado:</strong> {addressContact.state}</Typography>
            <Typography><strong>Municipio:</strong> {addressContact.municipality}</Typography>
            <Typography><strong>Calle y Número:</strong> {addressContact.street_and_number}</Typography>
            <Typography><strong>Teléfono:</strong> {addressContact.phone_number}</Typography>
            <Typography><strong>Email:</strong> {addressContact.email || "No registrado"}</Typography>
            <Button onClick={() => setEditMode(true)} variant="outlined" color="primary">Editar</Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}