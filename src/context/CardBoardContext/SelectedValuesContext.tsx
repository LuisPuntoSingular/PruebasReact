import React, { createContext, useContext, useState } from "react";


//
interface SelectedValuesContextType {
  selectedCorrugado: string | null;
  setSelectedCorrugado: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDerivado: string | null;
  setSelectedDerivado: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPriceM2: string | null;
  setSelectedPriceM2: React.Dispatch<React.SetStateAction<string | null>>;
  resistanceMinimum: number | null;
  setResistanceMinimum: React.Dispatch<React.SetStateAction<number | null>>;
  utilidad: number | "";
  setUtilidad: React.Dispatch<React.SetStateAction<number | "">>;
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
  selectedResistencia: string | null; // Nuevo
  setSelectedResistencia: React.Dispatch<React.SetStateAction<string | null>>; // Nuevo

 
}

const SelectedValuesContext = createContext<SelectedValuesContextType | undefined>(undefined);

export const SelectedValuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
 
 // Estados para los valores seleccionados de Cardboard 
  const [selectedCorrugado, setSelectedCorrugado] = useState<string | null>(null);
  const [selectedDerivado, setSelectedDerivado] = useState<string | null>(null);
  const [selectedPriceM2, setSelectedPriceM2] = useState<string | null>(null);
  const [resistanceMinimum, setResistanceMinimum] = useState<number | null>(null);
  const [selectedResistencia, setSelectedResistencia] = useState<string | null>(null); // Nuevo

 // Este campo es individual y no se guarda en el contexto de Cardboard
  const [utilidad, setUtilidad] = useState<number | "">("");
 // Este campo es individual y no se guarda en el contexto de Cardboard
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");

  

  return (
    <SelectedValuesContext.Provider
      value={{
        // Valores seleccionados de Cardboard
        selectedCorrugado,
        setSelectedCorrugado,
        selectedDerivado,
        setSelectedDerivado,
        selectedPriceM2,
        setSelectedPriceM2,
        resistanceMinimum,
        setResistanceMinimum,
        selectedResistencia, // Nuevo
        setSelectedResistencia,
        // Valores individuales
        utilidad,
        setUtilidad,
        // Este campo es individual 
        selectedMaterial,
        setSelectedMaterial,

     
      }}
    >
      {children}
    </SelectedValuesContext.Provider>
  );
};

export const useSelectedValues = () => {
  const context = useContext(SelectedValuesContext);
  if (!context) {
    throw new Error("useSelectedValues must be used within a SelectedValuesProvider");
  }
  return context;
};