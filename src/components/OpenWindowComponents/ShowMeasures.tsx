import React from "react";
import CardboardMeasure from "./ShowInputsComponents/Cardboard/CardboardMeasures";
import CardBoardMeasureWithoutHigh from "./ShowInputsComponents/Cardboard/CardBoardMeasureWithoutHigh";
import GridMeasure from "./ShowInputsComponents/Cardboard/GridMeasure";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext"; // Importar el contexto
import PalletMeasures from "./ShowInputsComponents/Pallets/PalletsMeasures"; // Importar el componente PalletMeasures

type Row = {
  part: string;
  largo: string;
  ancho: string;
  cantidad: string;
};

interface ShowMeasuresProps {
  rows: Row[]; // Filas para GridMeasure
  handleInputChangeRejilla: (index: number, field: keyof Row, value: string) => void; // Manejar cambios en GridMeasure
}

const ShowMeasures: React.FC<ShowMeasuresProps> = ({ }) => {
  const { selectedMaterial, selectedDerivado } = useSelectedValues(); // Obtener el material seleccionado desde el contexto

  return (
    <div>
      {/* Renderizar GridMeasure si el derivado es "Rejilla" y el material es "Carton" */}
      {selectedDerivado === "Rejilla" && selectedMaterial === "Carton" && (
        <GridMeasure key="rejilla" />
      )}

      {/* Renderizar PalletMeasures solo si el material es "Madera" */}
      {selectedMaterial === "Madera" && <PalletMeasures key="pallets" />}

      {/* Renderizar CardBoardMeasureWithoutHigh si el derivado es "Area" o "Separador" */}
      {(selectedDerivado === "Area" || selectedDerivado === "Separador") ||
  (
    
    selectedMaterial === "Foam" ||
    selectedMaterial === "Poliburbuja" ||
    selectedMaterial === "EPE" ||
    selectedMaterial === "EVA") && (
    <CardBoardMeasureWithoutHigh key="cardboardWithoutHigh" />
  )}

      {/* Renderizar CardboardMeasure para los demás derivados */}
      {selectedMaterial === "Carton" &&
        selectedDerivado !== "Rejilla" &&
        selectedDerivado !== "Area" &&
        selectedDerivado !== "Separador" && (
          <CardboardMeasure key="cardboard" />
        )}
    </div>
  );
};

export default ShowMeasures;