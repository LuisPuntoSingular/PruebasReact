import React from "react";
import ShowCardboardPrice from "./ShowInputsComponents/Cardboard/ShowCardboardPrice";
import ShowFEEPPrice from "./ShowInputsComponents/Epe/ShowFEEPPrice";
import ShowPalletsPrice from "./ShowInputsComponents/Pallets/ShowPalletsPrice"; // Importar el nuevo componente
import ShowFoamPrice from "./ShowInputsComponents/Foam/ShowFoamPrice"; // Importar el nuevo componente
import ShowPolybubblePrice from "./ShowInputsComponents/Polybubble/ShowPolybubblePrice"; // Importar el nuevo componente
import { Box } from "@mui/system";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext"; // Importar el contexto

const ShowPrice: React.FC = () => {
  const { selectedMaterial } = useSelectedValues(); // Obtener el material seleccionado desde el contexto

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
      ) : selectedMaterial === "Madera" ? (
        <ShowPalletsPrice />
      ) : selectedMaterial === "EPE" ? (
        <ShowFEEPPrice />
      ): selectedMaterial === "Foam"? (
        <ShowFoamPrice /> 
        ):<ShowPolybubblePrice /> }
    </Box>
  );
};

export default ShowPrice;