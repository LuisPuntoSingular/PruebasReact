import React from "react";
import ShowCardboardPrice from "./ShowInputsComponents/Cardboard/ShowCardboardPrice";
import ShowFEEPPrice from "./ShowInputsComponents/Epe/ShowFEEPPrice";
import ShowPalletsPrice from "./ShowInputsComponents/Pallets/ShowPalletsPrice";
import ShowFoamPrice from "./ShowInputsComponents/Foam/ShowFoamPrice";
import ShowPolybubblePrice from "./ShowInputsComponents/Polybubble/ShowPolybubblePrice";
import { Box } from "@mui/system";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";
import ShowEvaPrice from "./ShowInputsComponents/Eva/ShowEvaPrice";

const ShowPrice: React.FC = () => {
  const { selectedMaterial } = useSelectedValues(); // Obtener el material seleccionado desde el contexto

  // Renderizar el componente correspondiente según el material seleccionado
  const renderSelectedComponent = () => {
    switch (selectedMaterial) {
      case "EVA":
        return <ShowEvaPrice />;
      case "Madera":
        return <ShowPalletsPrice />;
      case "EPE":
        return <ShowFEEPPrice />;
      case "Foam":
        return <ShowFoamPrice />;
      case "Poliburbuja":
        return <ShowPolybubblePrice />;
      default:
        return <ShowCardboardPrice />;
    }
  };

  return (
    <Box
      sx={{
        width: "100%", // Ocupa todo el ancho disponible
        display: "flex", // Asegura que el contenido se alinee correctamente
        justifyContent: "center", // Centra el contenido horizontalmente
        alignItems: "center", // Centra el contenido verticalmente
      }}
    >
      {renderSelectedComponent()}
    </Box>
  );
};

export default ShowPrice;