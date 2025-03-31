import React from "react";
import CardboardMeasure from "./ShowInputsComponents/Cardboard/CardboardMeasures";
import GridMeasure from "./ShowInputsComponents/Cardboard/GridMeasure";

type Row = {
  part: string;
  largo: string;
  ancho: string;
  cantidad: string;
};

interface CustomFormData {
  cantidad:  "";
  largo:  "";
  ancho:  "";
  alto:  "";

}

interface ShowMeasuresProps {
  selectedDerivative: string; // Derivado seleccionado
  rows: Row[]; // Filas para GridMeasure
  handleInputChangeRejilla: (index: number, field: keyof Row, value: string) => void; // Manejar cambios en GridMeasure
  onTotalChange: (total: number) => void; // Manejar el total en GridMeasure

 
}

const ShowMeasures: React.FC<ShowMeasuresProps> = ({
  selectedDerivative,
  rows,
  handleInputChangeRejilla,
  onTotalChange,
  
}) => {
  return (
    <div>
      {/* Renderizar condicionalmente los componentes */}
      {selectedDerivative === "Rejilla" ? (
        <GridMeasure
   
        />
      ) : (
        <CardboardMeasure
         
        />
      )}
    </div>
  );
};

export default ShowMeasures;