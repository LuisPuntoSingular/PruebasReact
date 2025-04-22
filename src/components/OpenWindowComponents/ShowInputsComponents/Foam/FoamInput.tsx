import React, { useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import FoamInputColors from "./FoamInputColors";
import { useFoamContext } from "@/context/Foam/FoamContext";
import { useApi } from "@/context/ApiContext";
import { Foam,FoamPrecio } from "@/context/Interfaces/interfaces";




const FoamInput: React.FC = () => {
  
  const { foam, foamprecio } = useApi();
  const {
   
    setFoam,
    selectedFoam="",
    setFoamprecio,
    setSelectedFoam,
    selectedMedidaPrecioRollos,
    setSelectedMedidaPrecioRollos,
    setSelectedMedidaPrecioRollosLaminados,
    setSelectedRolloType,
    selectedRolloType="",
    
  } = useFoamContext(); // Usar el contexto para enviar las variables

  // Manejar el cambio del foam seleccionado
  const handleFoamChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedFoam(value); // Enviar al contexto
  };


// Manejar el cambio de medida/precio para Rollos
const handleMedidaPrecioRollosChange = (event: SelectChangeEvent<string>) => {
  const selectmedidaRollo = event.target.value;


  // Buscar el elemento seleccionado en la lista de medidas/precios
  const selectedItem = foamprecio.find((item: FoamPrecio) => item.medidas === selectmedidaRollo);

  if (selectedItem) {
    setSelectedMedidaPrecioRollos({
      medida: selectedItem.medidas,
      precio: Number(selectedItem.precio),
      anchorollo: Number(selectedItem["ancho rollo"]),
      largorollo: Number(selectedItem["largo rollo"]),
    });
  }
};

  
  // Manejar el cambio de medida/precio para Rollos Laminados
const handleMedidaPrecioRollosLaminadosChange = (event: SelectChangeEvent<string>) => {
  const selectmedidaRollo = event.target.value;

  // Filtrar elementos que sean de tipo "Rollos Laminados"
  const filteredItems = foamprecio.filter(
    (item: FoamPrecio) => foam.find((f: Foam) => f.id === item.idfoam)?.derivado === "Rollos Laminados"
  );

  // Buscar el elemento seleccionado dentro de los elementos filtrados
  const selectedItem = filteredItems.find((item: FoamPrecio) => item.medidas === selectmedidaRollo);
  if (selectedItem) {
      setSelectedMedidaPrecioRollosLaminados({
      medida: selectedItem.medidas,
      precio: Number(selectedItem.precio),
      anchorollo: Number(selectedItem["ancho rollo"]),
      largorollo: Number(selectedItem["largo rollo"]),
      
    });
  }
    

};

  // Manejar el cambio de tipo de Rollo
  const handleRolloTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedRolloType(value); // Enviar al contexto
  };

  // Enviar datos iniciales al contexto
  useEffect(() => {
    setFoam(foam); // Enviar la lista de foams al contexto
    setFoamprecio(foamprecio); // Enviar la lista de medidas y precios al contexto
  }, [foam, foamprecio, setFoam, setFoamprecio]);

  // Filtrar medidas/precios para Rollos según el foam seleccionado por nombre
  const filteredMedidasPrecioRollos = foamprecio.filter(
    (item: FoamPrecio) => foam.find((f:Foam) => f.id === item.idfoam)?.derivado === "Rollo"
  );

  // Filtrar medidas/precios para Rollos Laminados según el foam seleccionado por nombre
  const filteredMedidasPrecioRollosLaminados = foamprecio.filter(
    (item: FoamPrecio) => foam.find((f:Foam) => f.id === item.idfoam)?.derivado === "Rollos Laminados"
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Input para Derivado */}
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
          Derivado
        </InputLabel>
        <Select
          size="small"
          value={selectedFoam || ''}
          onChange={handleFoamChange}
          label="Derivado"
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
          {foam.map((item: Foam) => (
            <MenuItem key={item.id} value={item.derivado}>
              {item.derivado}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Inputs de Colores y Colores Precio */}
      {selectedFoam === "Placa" && <FoamInputColors />}

      {/* Input para Tipo de Rollo */}
      {
      selectedFoam === "Rollo" && (
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
            Tipo de Rollo
          </InputLabel>
          <Select
            size="small"
            value={selectedRolloType || ''}
            onChange={handleRolloTypeChange}
            label="Tipo de Rollo"
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
            <MenuItem value="Hoja">Hoja</MenuItem>
            <MenuItem value="Bolsa">Bolsa</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Input para Medidas/Precio (Rollos) */}
      {selectedFoam === "Rollo" && (
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
            Medidas/Precio Rollos
          </InputLabel>
          <Select
            size="small"
            
             value={selectedMedidaPrecioRollos?.medida || ''}
            onChange={handleMedidaPrecioRollosChange}
            label="Medidas/Precio Rollos"
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
            {filteredMedidasPrecioRollos.map((item: FoamPrecio) => (
              <MenuItem key={item.id} value={item.medidas}>
                {item.medidas} - ${item.precio}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Input para Medidas/Precio (Rollos Laminados) */}
      {selectedFoam === "Rollos Laminados" && (
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
            Medidas/Precio Rollos Laminados
          </InputLabel>
          <Select
            size="small"
            onChange={handleMedidaPrecioRollosLaminadosChange}
            label="Medidas/Precio Rollos Laminados"
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
            {filteredMedidasPrecioRollosLaminados.map((item: FoamPrecio) => (
              <MenuItem key={item.id} value={item.medidas}>
                {item.medidas} - ${item.precio}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default FoamInput;