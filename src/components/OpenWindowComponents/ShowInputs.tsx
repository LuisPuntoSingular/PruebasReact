import React from "react";

import CardboardInput from "./ShowInputsComponents/Cardboard/CardboardInput";
import EpeInput from "./ShowInputsComponents/Epe/EpeInput";
import FoamInput from "./ShowInputsComponents/Foam/FoamInput";
import PolybubbleInputs from "./ShowInputsComponents/Polybubble/PolybubbleInputs";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";
import EvaInputs from "./ShowInputsComponents/Eva/EvaInputs";

const ShowInputs: React.FC = () => {
  const { selectedMaterial } = useSelectedValues();

  return (
    <div>
      {/* Mostrar CardboardInput si el material seleccionado es "Cartón" */}
      {selectedMaterial === "Carton" && <CardboardInput />}

      {/* Mostrar EpeInput si el material seleccionado es "EPE" */}
      {selectedMaterial === "EPE" && <EpeInput />}

      {/* Mostrar FoamInput si el material seleccionado es "Foam" */}
      {selectedMaterial === "Foam" && <FoamInput />}

      {/* Mostrar PolybubbleInputs si el material seleccionado es "Poliburbuja" */}
      {selectedMaterial === "Poliburbuja" && <PolybubbleInputs />}

      {/* Mostrar evaInput si el material seleccionado es "Eva" */}
      {selectedMaterial === "EVA" && <EvaInputs />}

    </div>
  );
};

export default ShowInputs;