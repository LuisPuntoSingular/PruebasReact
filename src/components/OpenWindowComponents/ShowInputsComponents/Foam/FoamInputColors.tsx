import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useApi } from "@/context/ApiContext"; // Obtener datos desde ApiContext
import { useFoamColorsContext } from "@/context/Foam/FoamColorsContext"; // Manejar lógica de selección
import { FoamColor,ColorPrecio } from "@/context/Interfaces/interfaces"; // Definir la interfaz Colors si no está importada


// Define the ColorPrecio type if not imported



const FoamInputColors: React.FC = () => {
  const { coloresFoam, coloresPrecio } = useApi(); // Obtener colores y coloresPrecio desde ApiContext
  const { selectedColor, setSelectedColor, selectedColorPrecio, setSelectedColorPrecio } = useFoamColorsContext(); // Manejar selección

  // Manejar el cambio del color seleccionado
  const handleColorChange = (event: SelectChangeEvent<string>) => {
    
    const selectedId = event.target.value;

    const SelectedItem = coloresFoam.find((item:FoamColor) => item.id.toString() === selectedId);
    if (SelectedItem) {
    
      setSelectedColor({
        id: Number(selectedId),
        color: SelectedItem.color,
        anchoplaca: SelectedItem.anchoplaca,
        largoplaca: SelectedItem.largoplaca,
      });
    }


   
  };

  // Manejar el cambio del color con precio seleccionado
  const handleColorPrecioChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedItem = filteredColoresPrecio.find((item: ColorPrecio) => item.medida === selectedId);
    if (selectedItem) {
      setSelectedColorPrecio({
        id: Number(selectedItem.id),
        medida: selectedItem.medida,
        precio: selectedItem.precio,
        idcoloresfoam: selectedItem.idcoloresfoam,
    });
    } 
    
  };





 
  const filteredColoresPrecio = coloresPrecio.filter(
    (colorPrecio: ColorPrecio) => colorPrecio.idcoloresfoam === parseInt(selectedColor?.id.toString() || "0")
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Input para Colores */}
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          marginTop: "16px", // Espaciado superior
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
          Colores
        </InputLabel>
        <Select
          size="small"
          value={selectedColor?.id.toString() || ""}
          onChange={handleColorChange}
          label="Colores"
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
          {coloresFoam && Array.isArray(coloresFoam) ? (
            coloresFoam.map((color) => (
              <MenuItem key={color.id} value={color.id.toString()}>
                {color.color}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Cargando...</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Input para Colores Precio */}
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          marginTop: "16px", // Espaciado superior
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
          Colores Medida/Precio
        </InputLabel>
        <Select
          size="small"
          value={selectedColorPrecio?.medida}
          onChange={handleColorPrecioChange}
          label="Colores Medida/Precio"
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
            {filteredColoresPrecio.length > 0 ? (
            filteredColoresPrecio.map((colorPrecio: ColorPrecio) => (
              <MenuItem key={colorPrecio.id} value={colorPrecio.medida}>
              {colorPrecio.medida} - ${colorPrecio.precio}
              </MenuItem>
            ))
            ) : (
            <MenuItem disabled>Seleccione un color primero</MenuItem>
            )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FoamInputColors;