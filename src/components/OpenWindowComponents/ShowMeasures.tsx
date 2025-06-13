import React from "react";
import CardboardMeasure from "./ShowInputsComponents/Cardboard/CardboardMeasures";
import CardBoardMeasureWithoutHighMm from "./ShowInputsComponents/Cardboard/CardBoardMeasureWithoutHighMm";
import CardBoardMeasureWithoutHighCm from "./ShowInputsComponents/Cardboard/CardBoardMeasureWithoutHighCm";
import GridMeasure from "./ShowInputsComponents/Cardboard/GridMeasure";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";
import PalletMeasures from "./ShowInputsComponents/Pallets/PalletsMeasures";

type Row = {
  part: string;
  largo: string;
  ancho: string;
  cantidad: string;
};

interface ShowMeasuresProps {
  rows: Row[];
  handleInputChangeRejilla: (index: number, field: keyof Row, value: string) => void;
}

const ShowMeasures: React.FC<ShowMeasuresProps> = ({ }) => {
  const { selectedMaterial, selectedDerivado } = useSelectedValues();

  return (
    <div>
      {/* Renderizar GridMeasure si el derivado es "Rejilla" y el material es "Carton" */}
      {selectedDerivado === "Rejilla" && selectedMaterial === "Carton" && (
        <GridMeasure key="rejilla" />
      )}

      {/* Renderizar PalletMeasures solo si el material es "Madera" */}
      {selectedMaterial === "Madera" && <PalletMeasures key="pallets" />}

      {/* Renderizar CardBoardMeasureWithoutHighMm si el derivado es "Area" o "Separador" */}
      {(selectedDerivado === "Area" || selectedDerivado === "Separador") && (
        <CardBoardMeasureWithoutHighMm key="cardboardWithoutHighMm" />
      )}

      {/* Renderizar CardBoardMeasureWithoutHighCm si el material es Foam, Poliburbuja, EPE o EVA */}
      {(selectedMaterial === "Foam" ||
        selectedMaterial === "Poliburbuja" ||
        selectedMaterial === "EPE" ||
        selectedMaterial === "EVA") && (
        <CardBoardMeasureWithoutHighCm key="cardboardWithoutHighCm" />
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