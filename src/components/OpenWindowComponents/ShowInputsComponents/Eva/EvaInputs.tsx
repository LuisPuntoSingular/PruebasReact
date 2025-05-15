import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useApi } from "@/context/GlobalApis/ApiContext";
import { useEva } from "@/context/EvaContext/EvaContext";

const EvaInputs: React.FC = () => {
  const { eva } = useApi(); // Obtener evaData del contexto ApiContext
  const { selectedEva, setSelectedEva } = useEva(); // Obtener lógica de EvaContext

  const handleMedidasChange = (event: SelectChangeEvent<string>) => {
    // Obtener el valor seleccionado
    const selectedMedida = event.target.value;
    console.log("Selected medida:", selectedMedida); // Imprimir el valor seleccionado en la consola

    // Buscar el elemento seleccionado en los datos de eva
    const selectedItem = eva?.find((item: { medida: string; precio: string }) => item.medida === selectedMedida);

    // Actualizar el estado de selectedEva con la medida y el precio correspondientes
    if (selectedItem) {
      setSelectedEva({ medida: selectedItem.medida, precio: Number(selectedItem.precio) });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          background: "rgba(194, 176, 176, 0.34)", // Fondo del campo
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
        }}
      >
        <InputLabel
          sx={{
            color: "#ffffff", // Color inicial del label
            "&.Mui-focused": {
              color: "#ffffff", // Color del label cuando está enfocado
            },
          }}
        >
          Medidas
        </InputLabel>
        <Select
          size="small"
          value={selectedEva?.medida || ""}
          onChange={handleMedidasChange}
          label="Medidas"
          sx={{
            color: "#ffffff", // Color del texto
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)", // Color del borde
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff", // Color del borde al pasar el mouse
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff", // Color del borde cuando está enfocado
            },
          }}
        >
          {eva && Array.isArray(eva) ? (
            eva.map((item: { id: number; medida: string; precio: string }) => (
              <MenuItem key={item.id} value={item.medida}>
                {item.medida} - ${Number(item.precio)}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Cargando...</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EvaInputs;