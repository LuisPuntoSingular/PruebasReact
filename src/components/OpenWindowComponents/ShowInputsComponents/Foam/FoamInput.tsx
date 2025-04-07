import React, { useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import FoamInputColors from "./FoamImputColors";
import { useFoamContext } from "@/context/Foam/FoamContext";
import { useApi } from "@/context/ApiContext";
interface Derivado {
  id: number;
  derivado: string;
}

interface MedidaPrecio {
  id: number;
  medidas: string;
  precio: string;
  idfoam: number;
  "ancho rollo": string;
  "largo rollo": string;
}

const FoamInput: React.FC = () => {
  const { foam, foamprecio } = useApi();
  const {
   
    setFoam,
    selectedFoam,
    setFoamprecio,
    setSelectedFoam,
    setSelectedMedidaPrecioRollos,
    setSelectedMedidaPrecioRollosLaminados,
    setSelectedRolloType,
  } = useFoamContext(); // Usar el contexto para enviar las variables

  // Manejar el cambio del foam seleccionado
  const handleFoamChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedFoam(value); // Enviar al contexto
  };

  // Manejar el cambio de medida/precio para Rollos
  const handleMedidaPrecioRollosChange = (event: SelectChangeEvent<string>) => {
    const selectmedidaRollo = event.target.value;

    const selectedItem = foamprecio.find((item: MedidaPrecio) => item.medidas === selectmedidaRollo);

   
        if(selectedItem) {
          setSelectedMedidaPrecioRollos({
            medida: selectedItem.medidas,precio: selectedItem.precio,
            anchorollo: selectedItem["ancho rollo"],largorollo: selectedItem["largo rollo"]})}; // Enviar al contexto};
     // Enviar al contexto
     
  };

  // Manejar el cambio de medida/precio para Rollos Laminados
  const handleMedidaPrecioRollosLaminadosChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedMedidaPrecioRollosLaminados(value); // Enviar al contexto
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
    (item: MedidaPrecio) => foam.find((f:Derivado) => f.id === item.idfoam)?.derivado === "Rollo"
  );

  // Filtrar medidas/precios para Rollos Laminados según el foam seleccionado por nombre
  const filteredMedidasPrecioRollosLaminados = foamprecio.filter(
    (item: MedidaPrecio) => foam.find((f:Derivado) => f.id === item.idfoam)?.derivado === "Rollos Laminados"
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
          {foam.map((item: Derivado) => (
            <MenuItem key={item.id} value={item.derivado}>
              {item.derivado}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Inputs de Colores y Colores Precio */}
      {selectedFoam === "Placa" && <FoamInputColors />}

      {/* Input para Tipo de Rollo */}
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
            Tipo de Rollo
          </InputLabel>
          <Select
            size="small"
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
            {filteredMedidasPrecioRollos.map((item: MedidaPrecio) => (
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
            {filteredMedidasPrecioRollosLaminados.map((item: MedidaPrecio) => (
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