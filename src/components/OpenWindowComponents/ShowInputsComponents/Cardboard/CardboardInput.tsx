import React, { useEffect } from "react";
import { FormControl, TextField, MenuItem, Box } from "@mui/material";
import { useApi } from "@/context/ApiContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";

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

  // Encontrar la resistencia seleccionada
  const selectedResistance = resistances.find(
    (resistencia: any) => resistencia.resistances === selectedResistencia
  );

  // Obtener el valor de pricem2 de la resistencia seleccionada
  const ContextresistancePriceM2 = selectedResistance?.pricem2;
  const ContextresistanceMinimum = selectedResistance?.minimum;

  // Guardar automáticamente los valores seleccionados cuando cambien
  useEffect(() => {
    setSelectedPriceM2(ContextresistancePriceM2 || null);
    setResistanceMinimum(ContextresistanceMinimum || null);
  }, [selectedCorrugado, selectedDerivado, ContextresistancePriceM2, ContextresistanceMinimum]);


  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => 
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
          {corrugated.map((corrugado: any) => (
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
          {filteredResistances.map((resistencia: any) => (
            <MenuItem key={resistencia.resistanceid} value={resistencia.resistances}>
              {resistencia.resistances}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
};

export default CardboardInput;