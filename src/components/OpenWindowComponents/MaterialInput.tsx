import React from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";

interface MaterialInputProps {
  selectedMaterial: string;
  handleMaterialChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaterialInput: React.FC<MaterialInputProps> = ({ selectedMaterial, handleMaterialChange }) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: "16px" }}>
      <TextField
       size="small"
        fullWidth // Asegura que el campo ocupe todo el ancho disponible
        select
        label="Seleccionar Material"
        value={selectedMaterial}
        onChange={handleMaterialChange}
        sx={{
          background: "rgba(194, 176, 176, 0.34)", // Fondo del campo
          color: "#ffffff", // Color del texto
          borderRadius: "8px", // Bordes redondeados
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)", // Color del borde
            },
            "&:hover fieldset": {
              borderColor: "#ffffff", // Color del borde al pasar el mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff", // Color del borde cuando está enfocado
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)", // Color inicial del label
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ffffff", // Color del label cuando está enfocado
          },
        }}
      >
        <MenuItem value="Carbon">Carbon</MenuItem>
        <MenuItem value="Epe">Epe</MenuItem>
        <MenuItem value="Material 3">Material 3</MenuItem>
      </TextField>
    </FormControl>
  );
};

export default MaterialInput;