import React, { useEffect } from "react";
import { FormControl, TextField, MenuItem, Box } from "@mui/material";
import { useApi } from "@/context/ApiContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";

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
  const { corrugated, derivatives, resistances, loading, error } = useApi();
  const {
    selectedCorrugado: savedCorrugado,
    setSelectedCorrugado,
    selectedDerivado: savedDerivado,
    setSelectedDerivado,
    selectedPriceM2,
    setSelectedPriceM2,
    resistanceMinimum,
    setResistanceMinimum, // Nuevo setter
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
    setSelectedCorrugado(selectedCorrugado);
    setSelectedDerivado(selectedDerivado);
    setSelectedPriceM2(ContextresistancePriceM2 || null);
    setResistanceMinimum(ContextresistanceMinimum || null);

    // Guardar el valor de pricem2 en el contexto
  }, [selectedCorrugado, selectedDerivado, ContextresistancePriceM2,ContextresistanceMinimum , setSelectedCorrugado, setSelectedDerivado, setSelectedPriceM2]);

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
          onChange={handleCorrugadoChange}
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
          onChange={handleResistenciaChange}
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