import React from "react";
import { Card, CardContent, Box, TextField } from "@mui/material";
import { useMeasures } from "@/context/MeasuresContext"; // Importar el contexto de medidas

const CardboardMeasures: React.FC = () => {
  const { largo, setLargo, ancho, setAncho, alto, setAlto, cantidad, setCantidad } = useMeasures();

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "largo":
        setLargo(value === "" ? "" : parseFloat(value));
        break;
      case "ancho":
        setAncho(value === "" ? "" : parseFloat(value));
        break;
      case "alto":
        setAlto(value === "" ? "" : parseFloat(value));
        break;
      case "cantidad":
        setCantidad(value === "" ? "" : parseInt(value));
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
          {/* Campo para Largo */}
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Largo (mm)"
              type="number"
              fullWidth
              size="small"
              name="largo"
              value={largo || ""}
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: "#FFFFFF" }, // Color del texto del label
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
          </Box>

          {/* Campo para Ancho */}
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Ancho (mm)"
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
          </Box>

          {/* Campo para Alto */}
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Alto (mm)"
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

          {/* Campo para Cantidad */}
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              size="small"
              name="cantidad"
              value={cantidad || ""}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardboardMeasures;