import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import FoamTable from "./Foam/FoamTable";
import PreciosFoamTable from "./PreciosFoam/PreciosFoamTable";
import ColoresFoamTable from "./FoamColorsTables/ColoresFoam/ColoresFoamTable";
import ColoresPrecioTable from "./FoamColorsTables/ColoresPrecio/ColoresPrecioTable";


const CombinedTables: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Crear tabs dinámicos
  const tabs = [
    {
      label: "Rollo y Rollos Laminados",
      render: (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            flexDirection: { xs: "column", sm: "row" }, // Columna en móviles, fila en pantallas más grandes
          }}
        >
          <Box
            sx={{
              flex: "1 1 calc(50% - 16px)",
              minWidth: "300px",
              width: { xs: "100%", sm: "calc(50% - 16px)" }, // 100% en móviles
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tabla de Foam
            </Typography>
            <FoamTable />
          </Box>
          <Box
            sx={{
              flex: "1 1 calc(50% - 16px)",
              minWidth: "300px",
              width: { xs: "100%", sm: "calc(50% - 16px)" }, // 100% en móviles
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tabla de Precios Foam
            </Typography>
            <PreciosFoamTable />
          </Box>
        </Box>
      ),
    },
    {
      label: "Placa",
      render: (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            flexDirection: { xs: "column", sm: "row" }, // Columna en móviles, fila en pantallas más grandes
          }}
        >
          <Box
            sx={{
              flex: "1 1 calc(50% - 16px)",
              minWidth: "300px",
              width: { xs: "100%", sm: "calc(50% - 16px)" }, // 100% en móviles
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tabla de Colores Foam
            </Typography>
            <ColoresFoamTable />
          </Box>
          <Box
            sx={{
              flex: "1 1 calc(50% - 16px)",
              minWidth: "300px",
              width: { xs: "100%", sm: "calc(50% - 16px)" }, // 100% en móviles
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tabla de Precios de Colores Foam
            </Typography>
            <ColoresPrecioTable />
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{
          marginBottom: "16px",
          "& .MuiTabs-indicator": { backgroundColor: "#1976D2" },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Renderizar el contenido del tab activo */}
      {tabs[activeTab]?.render}
    </Box>
  );
};

export default CombinedTables;