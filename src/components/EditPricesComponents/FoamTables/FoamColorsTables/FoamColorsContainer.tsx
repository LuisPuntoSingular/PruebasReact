import React from "react";
import { Box, Typography } from "@mui/material";
import FoamColorTable from "./ColoresFoam/ColoresFoamTable";
import ColorPreciosFoamTable from "./ColoresPrecio/ColoresPrecioTable";

const CombinedColorsTables: React.FC = () => {
  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Gestión de Foam y Precios
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tabla de Colores Foam
          </Typography>
          <FoamColorTable />
        </Box>

        {/* Tabla de Precios Foam */}
        <Box
          sx={{
            flex: 1, // Ocupa el mismo espacio que la otra tabla
            minWidth: "300px", // Asegura un ancho mínimo
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tabla de Precios de Colores Foam
          </Typography>
          <ColorPreciosFoamTable />
        </Box>
      </Box>
    </Box>
  );
};

export default CombinedColorsTables;