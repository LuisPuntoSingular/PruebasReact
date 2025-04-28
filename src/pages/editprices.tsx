import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import MaterialsTable from "../components/EditPricesComponents/Materials/MaterialsTable";
import DerivativesTable from "../components/EditPricesComponents/Derivatives/DerivativesTable";
import ResistancesTable from "../components/EditPricesComponents/Resistances/ResistancesTable";
import ResistancesCategoriesTable from "../components/EditPricesComponents/ResistancesCategories/ResistancesCategoriesTable";
import EpeTable from "../components/EditPricesComponents/Epe/EpeTable";
import FoamTables from "../components/EditPricesComponents/FoamTables/FoamContainer";
import PoliburbujaTables from "@/components/EditPricesComponents/PolybubbleTables/PolybubbleContainer";
import EvaTable from "../components/EditPricesComponents/Eva/EvaTable";

const EditPrices: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>("");

  const tableOptions = [
    { label: "Materiales", value: "materials" },
    { label: "Derivados de Cartón", value: "derivatives" },
    { label: "Resistencias", value: "resistances" },
    { label: "Corrugados", value: "resistancescategories" },
    { label: "EPE", value: "epe" },
    { label: "Foam", value: "foam" },
    { label: "Poliburbuja", value: "poliburbuja" },
    { label: "EVA", value: "eva" },
  ];

  return (
    <Box sx={{ padding: "24px", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Selecciona una Tabla
        </Typography>
        <TextField
          select
          label="Tablas"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          sx={{
            width: "200px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {tableOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {selectedTable ? (
        <Box sx={{ marginTop: "32px" }}>
          {/* Renderiza el componente correspondiente según la tabla seleccionada */}
          {selectedTable === "materials" && <MaterialsTable />}
          {selectedTable === "derivatives" && <DerivativesTable />}
          {selectedTable === "resistances" && <ResistancesTable />}
          {selectedTable === "resistancescategories" && <ResistancesCategoriesTable />}
          {selectedTable === "epe" && <EpeTable />}
          {selectedTable === "foam" && <FoamTables />}
          {selectedTable === "poliburbuja" && <PoliburbujaTables />}
          {selectedTable === "eva" && <EvaTable />}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#888888", marginBottom: "16px" }}>
            Por favor, selecciona una tabla para comenzar.
          </Typography>
          <img
            src="https://via.placeholder.com/300x200?text=Selecciona+una+tabla"
            alt="Selecciona una tabla"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default EditPrices;