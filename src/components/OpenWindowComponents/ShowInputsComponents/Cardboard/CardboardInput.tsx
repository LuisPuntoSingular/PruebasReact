import React from "react";
import { FormControl, TextField, MenuItem, Box } from "@mui/material";
import { useApi } from "@/context/ApiContext";

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

  const { corrugated,derivatives, resistances, loading, error } = useApi(); // Obtén los datos desde el contexto
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Encontrar el categoryid del corrugado seleccionado
  const selectedCategory = corrugated.find(
    (corrugado: any) => corrugado.categoryname === selectedCorrugado
  );

  // Filtrar resistencias según el categoryid del corrugado seleccionado
  const filteredResistances = resistances.filter(
    (resistencia: any) => resistencia.categoryid === selectedCategory?.categoryid
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Select para Derivados */}
      <FormControl fullWidth>
        <TextField
         size="small"
          select
          label="Seleccionar Derivado"
          value={selectedDerivado || ""}
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
          {derivatives.map((derivado: any) => (
            <MenuItem key={derivado.id} value={derivado.name}>
              {derivado.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      {/* Select para Corrugados */}
      <FormControl fullWidth>
        <TextField
         size="small"
          select
          label="Seleccionar Corrugado"
          value={selectedCorrugado || ""}
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
        >{corrugated.map((corrugado: any) => (
          <MenuItem key={corrugado.categoryid} value={corrugado.categoryname}>
            {corrugado.categoryname}
          </MenuItem>
        ))}
        </TextField>
      </FormControl>

      {/* Select para Resistencias */}
      <FormControl fullWidth>
        <TextField
          size="small"
          select
          label="Seleccionar Resistencia"
          value={selectedResistencia || ""}
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
       {filteredResistances.length > 0 ? (
  filteredResistances.map((resistencia: any) => (
    <MenuItem key={resistencia.resistanceid} value={resistencia.resistances}>
      {resistencia.resistances}
    </MenuItem>
  ))
) : (
  <MenuItem disabled value="">
    No hay resistencias disponibles
  </MenuItem>
)}
        </TextField>
      </FormControl>
    </Box>
  );
};

export default CardboardInput;