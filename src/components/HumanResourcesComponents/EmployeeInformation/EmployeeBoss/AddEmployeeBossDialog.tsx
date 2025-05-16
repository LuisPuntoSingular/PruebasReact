import React from "react";
import { TextField, MenuItem, IconButton, Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface Boss {
  id: number;
  full_name: string; // Ahora solo necesitas el campo full_name
}

interface AddEmployeeBossDialogProps {
  employeeId: number; // ID del empleado proporcionado por el componente padre
  bosses: Boss[]; // Lista de jefes proporcionada por el componente padre
  selectedBoss: string; // Jefe seleccionado proporcionado por el componente padre
  setSelectedBoss: React.Dispatch<React.SetStateAction<string>>; // Función para actualizar el jefe seleccionado
  onReloadBosses: () => void; // Función para recargar la lista de jefes
}

const AddEmployeeBossDialog: React.FC<AddEmployeeBossDialogProps> = ({
  bosses,
  selectedBoss,
  setSelectedBoss,
  onReloadBosses,
}) => {
  // Manejar el cambio de selección
  const handleChange = (value: string) => {
    console.log("Jefe seleccionado:", value);
    setSelectedBoss(value === "" ? "0" : value); // Actualiza el estado en el componente padre
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        select
        label="Seleccionar Jefe"
        value={selectedBoss || ""} // Usa una cadena vacía si el valor es null
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      >
        {/* Opción para "Sin jefe" */}
        <MenuItem value="">Sin jefe</MenuItem>
        {/* Lista de jefes */}
        {bosses.map((boss) => (
          <MenuItem key={boss.id} value={boss.id.toString()}>
            {boss.full_name} {/* Usa directamente el campo full_name */}
          </MenuItem>
        ))}
      </TextField>

      {/* Botón de recarga */}
      <IconButton onClick={onReloadBosses} color="primary" aria-label="Recargar lista de jefes">
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};

export default AddEmployeeBossDialog;