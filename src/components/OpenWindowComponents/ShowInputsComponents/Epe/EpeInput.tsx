import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useApi } from "@/context/ApiContext";
import { useFEEP } from "@/context/FEEPContext/FEEPContext";

const EpeInput: React.FC = () => {
  const { epe } = useApi(); // Obtener epeData del contexto ApiContext
  const { selectedEpe, setSelectedEpe,} = useFEEP(); // Obtener lógica de FEEPContext

  const handleMedidasChange = (event: SelectChangeEvent<string>) => {
    // Obtener el valor seleccionado
    const selectedMedida = event.target.value;
    // Actualizar el estado de selectedEpe con el valor seleccionado
    const selectedItem = epe?.find((item: { medidas: string; precio: string }) => item.medidas === selectedMedida);
    // Actualizar el estado de selectedEpe con el precio correspondiente
    if (selectedItem) {
      setSelectedEpe({ medida: selectedItem.medidas, precio: Number(selectedItem.precio) });
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
          value={selectedEpe?.medida || ""}
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
          {epe && Array.isArray(epe) ? (
            epe.map((item: { id: number; medidas: string; precio: string }) => (
                          <MenuItem key={item.id} value={item.medidas}>
                            {item.medidas} - ${Number(item.precio)}
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

export default EpeInput;