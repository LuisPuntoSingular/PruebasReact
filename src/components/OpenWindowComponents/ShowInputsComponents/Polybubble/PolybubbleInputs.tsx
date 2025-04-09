import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useApi } from "@/context/ApiContext"; // Hook personalizado para las APIs
import { usePolybubbleContext } from "@/context/PolybubbleContext/PolybubbleContext"; // Contexto de Polybubble
import { Polybubble, PolybubblePrecio } from "@/context/Interfaces/interfaces"; // Interfaces para los datos


const PolybubbleInputs: React.FC = () => {
  const { poliburbuja, poliburbujaprecios } = useApi(); // Obtener datos desde el hook personalizado
  const {
    selectedPoliburbuja,
    setSelectedPoliburbuja,
    selectedPoliburbujaPrecio,
    setSelectedPoliburbujaPrecio,
  } = usePolybubbleContext(); // Usar el contexto de Polybubble

  // Manejar el cambio de Poliburbuja seleccionada
  const handlePoliburbujaChange = (event: SelectChangeEvent<string>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedPoliburbuja(selectedId);
    setSelectedPoliburbujaPrecio(null); // Reiniciar la selección de precios al cambiar el derivado
  };

  // Manejar el cambio de medida/precio seleccionada
  const handleMedidasChange = (event: SelectChangeEvent<string>) => {
    const selectedMedida = event.target.value;
  
    // Encuentra el elemento seleccionado basado en la medida y el idpoliburbuja
    const selectedItem = poliburbujaprecios.find(
      (item: PolybubblePrecio) =>
        item.medidas === selectedMedida && item.idpoliburbuja === selectedPoliburbuja
    );

    if (selectedItem) {
      setSelectedPoliburbujaPrecio({
        medida: selectedItem.medidas,
        precio: Number(selectedItem.precio),
        ancho: selectedItem.ancho_rollo, // Acceso correcto a la propiedad
        largo: selectedItem.largo_rollo, // Acceso correcto a la propiedad
      });
    }

    console.log("Selected Item:", selectedItem);
  };
  
  // Filtrar precios relacionados con el Poliburbuja seleccionado
  const filteredPoliburbujaPrecios = poliburbujaprecios.filter(
    (item: PolybubblePrecio) => item.idpoliburbuja === selectedPoliburbuja
  );
  
  // Depuración: Verifica los datos
  console.log("Poliburbujaprecios:", poliburbujaprecios);
  console.log("Filtered Poliburbujaprecios:", filteredPoliburbujaPrecios);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Selector de Poliburbuja */}
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          background: "rgba(194, 176, 176, 0.34)",
          borderRadius: "8px",
          marginBottom: "16px",
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
        }}
      >
        <InputLabel
          sx={{
            color: "#ffffff",
            "&.Mui-focused": {
              color: "#ffffff",
            },
          }}
        >
          Derivados
        </InputLabel>
        <Select
          size="small"
          value={selectedPoliburbuja?.toString() || ""}
          onChange={handlePoliburbujaChange}
          label="Derivados"
          sx={{
            color: "#ffffff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
          }}
        >
          {poliburbuja.map((item: Polybubble) => (
            <MenuItem key={item.id} value={item.id.toString()}>
              {item.derivados}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Selector de Medidas/Precios */}
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          background: "rgba(194, 176, 176, 0.34)",
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
        }}
      >
        <InputLabel
          sx={{
            color: "#ffffff",
            "&.Mui-focused": {
              color: "#ffffff",
            },
          }}
        >
          Medidas
        </InputLabel>
        <Select
          size="small"
          value={selectedPoliburbujaPrecio?.medida || ""}
          onChange={handleMedidasChange}
          label="Medidas"
          sx={{
            color: "#ffffff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
          }}
        >
          {filteredPoliburbujaPrecios.length > 0 ? (
            filteredPoliburbujaPrecios.map((item: PolybubblePrecio ) => (
              <MenuItem key={item.idpoliburbuja} value={item.medidas}>
                {item.medidas} - ${item.precio}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Seleccione un derivado primero</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PolybubbleInputs;