import React from "react";
import { Box, Typography } from "@mui/material";
import PolybubbleTable from "./Poliburbuja/PoliburbujaTable";
import PolybubblePrices from "./PoliburbujaPrecios/PoliburbujaPreciosTable";

const CombinedTables: React.FC = () => {
  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
        Gestión de Poliburbuja
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Columnas en pantallas pequeñas, filas en pantallas medianas o más grandes
          gap: "16px", // Espaciado entre las tablas
        }}
      >
        {/* Tabla de Foam */}
        <Box
          sx={{
            flex: 1, // Ocupa el mismo espacio que la otra tabla
            minWidth: "300px", // Asegura un ancho mínimo
            backgroundColor: "#fff", // Fondo blanco para la tabla
            borderRadius: "8px", // Bordes redondeados
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra para la tabla
            padding: "16px", // Espaciado interno
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
            Tabla de Poliburbuja
          </Typography>
          <PolybubbleTable />
        </Box>

        {/* Tabla de Precios Foam */}
        <Box
          sx={{
            flex: 1, // Ocupa el mismo espacio que la otra tabla
            minWidth: "300px", // Asegura un ancho mínimo
            backgroundColor: "#fff", // Fondo blanco para la tabla
            borderRadius: "8px", // Bordes redondeados
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra para la tabla
            padding: "16px", // Espaciado interno
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
            Tabla de Precios Poliburbuja
          </Typography>
          <PolybubblePrices />
        </Box>
      </Box>
    </Box>
  );
};

export default CombinedTables;