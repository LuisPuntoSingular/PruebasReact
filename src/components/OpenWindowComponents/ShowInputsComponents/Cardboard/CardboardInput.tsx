import React, { useEffect } from "react";
import { FormControl, TextField, MenuItem, Box } from "@mui/material";
import { useApi } from "@/context/ApiContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";
import {

  Derivative,
  Resistance,
  Category,
} from "@/context/Interfaces/interfaces";



const CardboardInput: React.FC = () => {
  const { corrugated, derivatives, resistances, loading, error } = useApi();

  const {
    selectedCorrugado,
    setSelectedCorrugado,
    selectedDerivado,
    setSelectedDerivado,
    selectedResistencia,
    setSelectedResistencia,
    setSelectedPriceM2,
    setResistanceMinimum,
  } = useSelectedValues();

 

  // Encontrar el categoryid del corrugado seleccionado
  const selectedCategory = corrugated.find(
    (corrugado: Category) => corrugado.categoryname === selectedCorrugado
  );

  // Filtrar resistencias según el categoryid del corrugado seleccionado
  const filteredResistances = resistances.filter(
    (resistencia: Resistance) => resistencia.categoryid === selectedCategory?.categoryid
  );




  // Encontrar la resistencia seleccionada
  const selectedResistance = resistances.find(
    (resistencia: Resistance) => resistencia.resistances === selectedResistencia
  );



  // Obtener el valor de pricem2 de la resistencia seleccionada
  const ContextresistancePriceM2 = selectedResistance?.pricem2;
  const ContextresistanceMinimum = selectedResistance?.minimum;

  // Guardar automáticamente los valores seleccionados cuando cambien
  useEffect(() => {
    setSelectedPriceM2(ContextresistancePriceM2 || null);
    setResistanceMinimum(ContextresistanceMinimum ? parseFloat(ContextresistanceMinimum) : null);
  }, [
    selectedCorrugado,
    selectedDerivado,
    ContextresistancePriceM2,
    ContextresistanceMinimum,
    setResistanceMinimum,
    setSelectedPriceM2,
  ]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };





  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Select para Derivados */}
      <FormControl fullWidth>
        <TextField
          size="small"
          select
          label="Seleccionar Derivado"
          value={selectedDerivado || ""}
          onChange={handleChange(setSelectedDerivado)}
          sx={{
            background: "rgba(194, 176, 176, 0.34)",
            color: "#ffffff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ffffff",
            },
          }}
        >
          {derivatives.map((derivado: Derivative) => (
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
          onChange={handleChange(setSelectedCorrugado)}
          sx={{
            background: "rgba(194, 176, 176, 0.34)",
            color: "#ffffff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ffffff",
            },
          }}
        >
          {corrugated.map((corrugado: Category) => (
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
          onChange={handleChange(setSelectedResistencia)}
          sx={{
            background: "rgba(194, 176, 176, 0.34)",
            color: "#ffffff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ffffff",
            },
          }}
        >
 {filteredResistances.map((resistance: Resistance) => (
  <MenuItem key={resistance.resistanceid} value={resistance.resistances}>
    {resistance.resistances}
  </MenuItem>
))}
        </TextField>
      </FormControl>
    </Box>
  );
};

export default CardboardInput;