import React, { useState } from "react";
import MaterialInput from "./MaterialInput";
import CardboardInput from "./ShowInputsComponents/CardboardInput";
import EpeInput from "./ShowInputsComponents/EpeInput";

interface ShowInputsProps {
    selectedMaterial: string; // Recibimos el valor seleccionado como prop
  }


const ShowInputs: React.FC<ShowInputsProps> = ({ selectedMaterial }) => {
    const [selectedDerivado, setSelectedDerivado] = useState<string>(""); // Estado para derivados
    const [selectedCorrugado, setSelectedCorrugado] = useState<string>(""); // Estado para corrugados
    const [selectedResistencia, setSelectedResistencia] = useState<string>(""); // Estado para resistencias
    const [medidas, setMedidas] = useState<string>(""); // Estado para medidas
  

  const handleDerivadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDerivado(event.target.value);
  };

  const handleCorrugadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCorrugado(event.target.value);
  };

  const handleResistenciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedResistencia(event.target.value);
  };

  const handleMedidasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedidas(event.target.value);
  };

  return (
    <div>
     

      {/* Mostrar CardboardInput si el material seleccionado es "Cartón" */}
      {selectedMaterial === "Carbon" && (
        <CardboardInput
          selectedDerivado={selectedDerivado}
          handleDerivadoChange={handleDerivadoChange}
          selectedCorrugado={selectedCorrugado}
          handleCorrugadoChange={handleCorrugadoChange}
          selectedResistencia={selectedResistencia}
          handleResistenciaChange={handleResistenciaChange}
        />
      )}

      {/* Mostrar EpeInput si el material seleccionado es "EPE" */}
      {selectedMaterial === "Epe" && (
        <EpeInput medidas={medidas} handleMedidasChange={handleMedidasChange} />
      )}
    </div>
  );
};

export default ShowInputs;