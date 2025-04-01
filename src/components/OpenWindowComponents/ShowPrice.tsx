import React from "react";
import ShowCardboardPrice from "./ShowCardboardPrice";
import ShowFEEPPrice from "./ShowFEEPPrice";
import { Box } from "@mui/system";

interface ShowPriceProps {
  selectedMaterial: string;
}

const ShowPrice: React.FC<ShowPriceProps> = ({ selectedMaterial }) => {
  return (
    <Box
      sx={{
        width: "100%", // Ocupa todo el ancho disponible
        display: "flex", // Asegura que el contenido se alinee correctamente
        justifyContent: "center", // Centra el contenido horizontalmente
        alignItems: "center", // Centra el contenido verticalmente
      }}
    >
      {selectedMaterial === "Carton" ? (
        <ShowCardboardPrice />
      ) : (
        <ShowFEEPPrice />
      )}
    </Box>
  );
};

export default ShowPrice;