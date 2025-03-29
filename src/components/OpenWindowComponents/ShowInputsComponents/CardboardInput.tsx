import React from "react";
import { FormControl, TextField, MenuItem, Box } from "@mui/material";

interface CardboardInputProps {
  selectedDerivado: string;
  handleDerivadoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCorrugado: string;
  handleCorrugadoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedResistencia: string;
  handleResistenciaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardboardInput: React.FC<CardboardInputProps> = ({
  selectedDerivado,
  handleDerivadoChange,
  selectedCorrugado,
  handleCorrugadoChange,
  selectedResistencia,
  handleResistenciaChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Select para Derivados */}
      <FormControl fullWidth>
        <TextField
         size="small"
          select
          label="Seleccionar Derivado"
          value={selectedDerivado}
          onChange={handleDerivadoChange}
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
          <MenuItem value="Derivado 1">Derivado 1</MenuItem>
          <MenuItem value="Derivado 2">Derivado 2</MenuItem>
          <MenuItem value="Derivado 3">Derivado 3</MenuItem>
        </TextField>
      </FormControl>

      {/* Select para Corrugados */}
      <FormControl fullWidth>
        <TextField
         size="small"
          select
          label="Seleccionar Corrugado"
          value={selectedCorrugado}
          onChange={handleCorrugadoChange}
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
          <MenuItem value="Corrugado 1">Corrugado 1</MenuItem>
          <MenuItem value="Corrugado 2">Corrugado 2</MenuItem>
          <MenuItem value="Corrugado 3">Corrugado 3</MenuItem>
        </TextField>
      </FormControl>

      {/* Select para Resistencias */}
      <FormControl fullWidth>
        <TextField
          size="small"
          select
          label="Seleccionar Resistencia"
          value={selectedResistencia}
          onChange={handleResistenciaChange}
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
          <MenuItem   value="Resistencia 1">Resistencia 1</MenuItem>
          <MenuItem value="Resistencia 2">Resistencia 2</MenuItem>
          <MenuItem value="Resistencia 3">Resistencia 3</MenuItem>
        </TextField>
      </FormControl>
    </Box>
  );
};

export default CardboardInput;