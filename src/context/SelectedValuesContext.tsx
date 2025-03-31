import React, { createContext, useContext, useState } from "react";

interface SelectedValuesContextType {
  selectedCorrugado: string | null;
  setSelectedCorrugado: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDerivado: string | null;
  setSelectedDerivado: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPriceM2: string | null;
  setSelectedPriceM2: React.Dispatch<React.SetStateAction<string | null>>;
  resistanceMinimum: number | null; // Nuevo campo
  setResistanceMinimum: React.Dispatch<React.SetStateAction<number | null>>; // Nuevo setter
  utilidad: number | ""; // Nuevo campo
  setUtilidad: React.Dispatch<React.SetStateAction<number | "">>; // Nuevo setter

}

const SelectedValuesContext = createContext<SelectedValuesContextType | undefined>(undefined);

export const SelectedValuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCorrugado, setSelectedCorrugado] = useState<string | null>(null);
  const [selectedDerivado, setSelectedDerivado] = useState<string | null>(null);
  const [selectedPriceM2, setSelectedPriceM2] = useState<string | null>(null);
  const [resistanceMinimum, setResistanceMinimum] = useState<number | null>(null); // Nuevo estado
  const [utilidad, setUtilidad] = useState<number | "">(""); // Nuevo estado


   // Aquí puedes agregar más estados si es necesario
  return (
    <SelectedValuesContext.Provider
      value={{
        selectedCorrugado,
        setSelectedCorrugado,
        selectedDerivado,
        setSelectedDerivado,
        selectedPriceM2,
        setSelectedPriceM2,
        resistanceMinimum, // Nuevo valor
        setResistanceMinimum, // Nuevo setter
        utilidad, // Nuevo valor
        setUtilidad, 
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