import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import CardboardInput from "./ShowInputsComponents/Cardboard/CardboardInput";
import EpeInput from "./ShowInputsComponents/Epe/EpeInput";

interface ShowInputsProps {
    selectedMaterial: string;
    selectedDerivative: string; 
    handleDerivativeChange: (value: string) => void; 

  }


const ShowInputs: React.FC<ShowInputsProps> = ({ selectedMaterial,  selectedDerivative,  handleDerivativeChange }) => {
    const [selectedCorrugated, setSelectedCorrugado] = useState<string>(""); // Estado para corrugados
    const [selectedResistances, setSelectedResistencia] = useState<string>(""); // Estado para resistencias
    const [medidas, setMedidas] = useState<string>(""); // Estado para medidas
  



  const handleCorrugadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCorrugado(event.target.value);
  };

  const handleResistenciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedResistencia(event.target.value);
  };

  const handleMedidasChange = (event: SelectChangeEvent<string>) => {
    setMedidas(event.target.value);
  };
  
  return (

    //este es el contenedor principal de la seccion 2 que contiene los inputs
  
    <div>
     

      {/* Mostrar CardboardInput si el material seleccionado es "Cartón" */}
      {selectedMaterial === "Carton" && (
        <CardboardInput
          selectedDerivado={selectedDerivative}
          handleDerivadoChange={(event) => handleDerivativeChange(event.target.value)}
          selectedCorrugado={selectedCorrugated}
          handleCorrugadoChange={handleCorrugadoChange}
          selectedResistencia={selectedResistances}
          handleResistenciaChange={handleResistenciaChange}
        />
      )}

      {/* Mostrar EpeInput si el material seleccionado es "EPE" */}
      {selectedMaterial === "EPE" && (
        <EpeInput  />
      )}



    </div>
  );
};

export default ShowInputs;