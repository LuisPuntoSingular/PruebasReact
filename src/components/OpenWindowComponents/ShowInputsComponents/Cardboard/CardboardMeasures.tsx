import React from "react";
import { Card, CardContent, Box, TextField } from "@mui/material";

interface MeasuresProps {
  formData: {
    cantidad: number | "";
    largo: number | "";
    ancho: number | "";
    alto: number | "";
  
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputCard: React.FC<MeasuresProps> = ({ formData, handleInputChange }) => {
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
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Largo (mm)"
              type="number"
              fullWidth
              size="small"
              name="largo"
              value={formData.largo}
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
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Ancho (mm)"
              type="number"
              fullWidth
              size="small"
              name="ancho"
              value={formData.ancho}
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
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Alto (mm)"
              type="number"
              fullWidth
              size="small"
              name="alto"
              value={formData.alto}
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
          <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              size="small"
              name="cantidad"
              value={formData.cantidad}
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

export default InputCard;