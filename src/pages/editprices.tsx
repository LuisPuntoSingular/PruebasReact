import React, { useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
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

  return (
    <Box sx={{ padding: "24px", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
     

      <Select
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
        displayEmpty
        sx={{
          marginBottom: "16px",
          width: "200px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MenuItem value="" disabled>
          Selecciona una tabla
        </MenuItem>
        <MenuItem value="materials">Materiales</MenuItem>
        <MenuItem value="derivatives">Derivados de Carton</MenuItem>
        <MenuItem value="resistances">Resistencias </MenuItem>
        <MenuItem value="resistancescategories">Corrugados</MenuItem>
        <MenuItem value="epe">EPE</MenuItem>
        <MenuItem value="foam">Foam</MenuItem>
     
        <MenuItem value="poliburbuja">Poliburbuja</MenuItem>

        <MenuItem value="eva">EVA</MenuItem>
      </Select>

      {/* Renderiza el componente correspondiente según la tabla seleccionada */}
      {selectedTable === "materials" && <MaterialsTable />}
      {selectedTable === "derivatives" && <DerivativesTable />}
      {selectedTable === "resistances" && <ResistancesTable />}
      {selectedTable === "resistancescategories" && <ResistancesCategoriesTable />}
      {selectedTable === "epe" && <EpeTable />}
      {selectedTable === "foam" && <FoamTables />}
      {selectedTable === "poliburbuja" && <PoliburbujaTables/>}
      {selectedTable === "eva" && <EvaTable />}
    </Box>
  );
};

export default EditPrices;