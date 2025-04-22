import React, { useState } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import MaterialsTable from "../components/EditPricesComponents/Materials/MaterialsTable";
import DerivativesTable from "../components/EditPricesComponents/Derivatives/DerivativesTable";
import ResistancesTable from "../components/EditPricesComponents/Resistances/ResistancesTable";
import ResistancesCategoriesTable from "../components/EditPricesComponents/ResistancesCategories/ResistancesCategoriesTable";
import EpeTable from "../components/EditPricesComponents/Epe/EpeTable";
import FoamTable from "../components/EditPricesComponents/Foam/FoamTable";
import PreciosFoamTable from "../components/EditPricesComponents/PreciosFoam/PreciosFoamTable";
import ColoresFoamTable from "../components/EditPricesComponents/ColoresFoam/ColoresFoamTable";
import ColoresPrecioTable from "../components/EditPricesComponents/ColoresPrecio/ColoresPrecioTable";
import PoliburbujaTable from "../components/EditPricesComponents/Poliburbuja/PoliburbujaTable";
import PoliburbujapreciosTable from "../components/EditPricesComponents/PoliburbujaPrecios/PoliburbujaPreciosTable";
import EvaTable from "../components/EditPricesComponents/Eva/EvaTable";

const EditPrices: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>("");

  return (
    <Box sx={{ padding: "24px", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px", color: "#333" }}>
        Editar Precios
      </Typography>

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
        <MenuItem value="preciosfoam">Precios/Medidas Foam</MenuItem>
        <MenuItem value="coloresfoam">Color/Medida de la Placa Foam</MenuItem>
        <MenuItem value="coloresprecio">Precios de Placa Foam </MenuItem>
        <MenuItem value="poliburbuja">Poliburbuja</MenuItem>
        <MenuItem value="poliburbujaprecios">Precios/Medidas de la Poliburbuja</MenuItem>
        <MenuItem value="eva">EVA</MenuItem>
      </Select>

      {/* Renderiza el componente correspondiente según la tabla seleccionada */}
      {selectedTable === "materials" && <MaterialsTable />}
      {selectedTable === "derivatives" && <DerivativesTable />}
      {selectedTable === "resistances" && <ResistancesTable />}
      {selectedTable === "resistancescategories" && <ResistancesCategoriesTable />}
      {selectedTable === "epe" && <EpeTable />}
      {selectedTable === "foam" && <FoamTable />}
      {selectedTable === "preciosfoam" && <PreciosFoamTable />}
      {selectedTable === "coloresfoam" && <ColoresFoamTable />}
      {selectedTable === "coloresprecio" && <ColoresPrecioTable />}
      {selectedTable === "poliburbuja" && <PoliburbujaTable />}
      {selectedTable === "poliburbujaprecios" && <PoliburbujapreciosTable />}
      {selectedTable === "eva" && <EvaTable />}
    </Box>
  );
};

export default EditPrices;