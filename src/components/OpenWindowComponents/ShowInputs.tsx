import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import CardboardInput from "./ShowInputsComponents/Cardboard/CardboardInput";
import EpeInput from "./ShowInputsComponents/Epe/EpeInput";
import FoamInput from "./ShowInputsComponents/Foam/FoamInput";
import PolybubbleInputs from "./ShowInputsComponents/Polybubble/PolybubbleInputs";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";

interface ShowInputsProps {
    
    

  }


const ShowInputs: React.FC<ShowInputsProps> = ({ }) => {
   
  const { selectedMaterial } = useSelectedValues();


 

  
  
  return (

    //este es el contenedor principal de la seccion 2 que contiene los inputs
  
    <div>
     

      {/* Mostrar CardboardInput si el material seleccionado es "Cartón" */}
      {selectedMaterial === "Carton" && (
        <CardboardInput/>
     )}

      {/* Mostrar EpeInput si el material seleccionado es "EPE" */}
      {selectedMaterial === "EPE" && (
        <EpeInput  />
      )}

  {/* Mostrar EpeInput si el material seleccionado es "EPE" */}
  {selectedMaterial === "Foam" && (
        <FoamInput  />
      )}

{selectedMaterial === "Poliburbuja" && (
        <PolybubbleInputs  />
      )}


    </div>
  );
};

export default ShowInputs;