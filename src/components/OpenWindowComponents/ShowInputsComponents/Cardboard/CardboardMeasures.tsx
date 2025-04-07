import React, { useEffect } from "react";
import { Card, CardContent, Box, TextField, Button } from "@mui/material";
import { useMeasures } from "@/context/CardBoardContext/CardboardMeasuresContext";

const CardboardMeasures: React.FC = () => {
  const { largo, setLargo, ancho, setAncho, alto, setAlto, cantidad, setCantidad } = useMeasures();

  // Establecer cantidad predeterminada en 1 al renderizar el componente (solo una vez)
  useEffect(() => {
    if (cantidad === "" || cantidad === null) {
      setCantidad(1);
    }
  }, [setCantidad]);

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "largo":
        const newLargo = value === "" ? "" : parseFloat(value);
        if (newLargo !== "" && ancho !== undefined && typeof newLargo === "number" && typeof ancho === "number" && newLargo < ancho) {
          alert("El largo no puede ser menor que el ancho.");
          return; // Evita actualizar el valor si no cumple la validación
        }
        setLargo(newLargo);
        break;
      case "ancho":
        const newAncho = value === "" ? "" : parseFloat(value);
        if (newAncho !== "" && largo !== undefined && typeof largo === "number" && largo < newAncho) {
          alert("El largo no puede ser menor que el ancho.");
          return; // Evita actualizar el valor si no cumple la validación
        }
        setAncho(newAncho);
        break;
      case "alto":
        setAlto(value === "" ? "" : parseFloat(value));
        break;
      case "cantidad":
        setCantidad(value === "" ? "" : parseInt(value)); // Permite que el usuario borre el valor temporalmente
        break;
      default:
        break;
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#1E293B", // Fondo oscuro
        color: "#FFFFFF", // Texto blanco
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2, // Espaciado entre elementos
          }}
        >
          {/* Largo, Ancho y Alto en una misma fila */}
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {/* Campo para Largo */}
            <TextField
              label="Largo"
              type="number"
              fullWidth
              size="small"
              name="largo"
              value={largo || ""}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#334155", // Fondo del campo de texto
                  color: "#FFFFFF", // Texto blanco
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#64748B", // Borde gris
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFFFFF", // Borde blanco al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3B82F6", // Borde azul al enfocar
                  },
                },
              }}
            />

            {/* Campo para Ancho */}
            <TextField
              label="Ancho"
              type="number"
              fullWidth
              size="small"
              name="ancho"
              value={ancho || ""}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#334155",
                  color: "#FFFFFF",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#64748B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFFFFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3B82F6",
                  },
                },
              }}
            />

            {/* Campo para Alto */}
            <TextField
              label="Alto"
              type="number"
              fullWidth
              size="small"
              name="alto"
              value={alto || ""}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#334155",
                  color: "#FFFFFF",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#64748B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFFFFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3B82F6",
                  },
                },
              }}
            />
          </Box>

          {/* Cantidad y Botón en la misma fila */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}>
            <TextField
              label="Cantidad"
              type="number"
              size="small"
              name="cantidad"
              value={cantidad || ""}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
              sx={{
                flex: 1, // Ocupa el espacio disponible
                "& .MuiInputBase-root": {
                  backgroundColor: "#334155",
                  color: "#FFFFFF",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#64748B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFFFFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3B82F6",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => {setCantidad(1),setAlto(0),setAncho(0),setLargo(0)}} // Ejemplo para limpiar el campo de cantidad
              sx={{
                backgroundColor: "#1E3A8A",
                color: "white",
                "&:hover": { backgroundColor: "#172554" },
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Limpiar
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardboardMeasures;