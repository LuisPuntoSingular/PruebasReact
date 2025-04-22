import React from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  backgroundColor: string;
  sx?: SxProps<Theme>; // Agregamos la propiedad opcional `sx`
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, backgroundColor, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px", // Reduce el espacio entre el ícono y el texto
        padding: "12px", // Reduce el padding interno
        backgroundColor: "#1E293B",
        color: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        ...sx, // Aplicamos los estilos personalizados pasados como `sx`
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px", // Reduce el tamaño del contenedor del ícono
          height: "40px", // Reduce el tamaño del contenedor del ícono
          borderRadius: "50%",
          backgroundColor,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "14px", // Reduce el tamaño de la fuente del título
            whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
            overflow: "hidden", // Oculta el texto que exceda el ancho
            textOverflow: "ellipsis", // Agrega puntos suspensivos si el texto es demasiado largo
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "20px", // Reduce el tamaño de la fuente del valor
            fontWeight: "bold",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;