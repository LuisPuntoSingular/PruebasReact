import React, { createContext, useContext, useState } from "react";

// Definición de la interfaz para el tipo de datos del contexto
interface FEEPContextType {
  selectedEpe: { medida: string; precio: number } | null; // Medida y precio seleccionados
  setSelectedEpe: (epe: { medida: string; precio: number }) => void; // Setter para actualizar la medida y el precio
  epeSizeWitdh: number; // Ancho de la hoja
  epeSizeLength: number; // Largo de la hoja
}

// Creación del contexto con un valor inicial indefinido
const FEEPContext = createContext<FEEPContextType | undefined>(undefined);

// Proveedor del contexto
export const FEEPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para almacenar la medida y el precio seleccionados
  const [selectedEpe, setSelectedEpe] = useState<{ medida: string; precio: number } | null>(null);

  // Constantes para el tamaño de la hoja
  const epeSizeWitdh = 122; // Ancho de la hoja
  const epeSizeLength = 184; // Largo de la hoja

  return (
    <FEEPContext.Provider value={{ selectedEpe, setSelectedEpe, epeSizeWitdh, epeSizeLength }}>
      {children}
    </FEEPContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFEEP = () => {
  const context = useContext(FEEPContext);
  if (!context) {
    throw new Error("useFEEP must be used within a FEEPProvider");
  }
  return context;
};