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
  cantidad: number | "";
  largo: number | "";
  ancho: number | "";
  alto: number | "";

}

interface ShowMeasuresProps {
  selectedDerivative: string; // Derivado seleccionado
  rows: Row[]; // Filas para GridMeasure
  handleInputChangeRejilla: (index: number, field: keyof Row, value: string) => void; // Manejar cambios en GridMeasure
  onTotalChange: (total: number) => void; // Manejar el total en GridMeasure
  formData: CustomFormData; // Datos del formulario para CardboardMeasure
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Manejar cambios en CardboardMeasure
}

const ShowMeasures: React.FC<ShowMeasuresProps> = ({
  selectedDerivative,
  rows,
  handleInputChangeRejilla,
  onTotalChange,
  formData,
  handleInputChange,
}) => {
  return (
    <div>
      {/* Renderizar condicionalmente los componentes */}
      {selectedDerivative === "Rejilla" ? (
        <GridMeasure
          rows={rows}
          handleInputChangeRejilla={handleInputChangeRejilla}
          onTotalChange={onTotalChange}
        />
      ) : (
        <CardboardMeasure
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ShowMeasures;