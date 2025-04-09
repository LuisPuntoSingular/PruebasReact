import React, { createContext, useContext, useState } from "react";

// Definición de la interfaz para el tipo de datos del contexto
interface EvaContextType {
  selectedEva: { medida: string; precio: number } | null; // Medida y precio seleccionados
  setSelectedEva: (eva: { medida: string; precio: number }) => void; // Setter para actualizar la medida y el precio
  evaSizeWidth: number; // Ancho de la hoja EVA
  evaSizeLength: number; // Largo de la hoja EVA
}

// Creación del contexto con un valor inicial indefinido
const EvaContext = createContext<EvaContextType | undefined>(undefined);

// Proveedor del contexto
export const EvaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para almacenar la medida y el precio seleccionados
  const [selectedEva, setSelectedEva] = useState<{ medida: string; precio: number } | null>(null);

  // Constantes para el tamaño de la hoja EVA
  const evaSizeWidth = 100; // Ancho de la hoja EVA (puedes ajustar este valor según sea necesario)
  const evaSizeLength = 200; // Largo de la hoja EVA (puedes ajustar este valor según sea necesario)

  return (
    <EvaContext.Provider value={{ selectedEva, setSelectedEva, evaSizeWidth, evaSizeLength }}>
      {children}
    </EvaContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useEva = () => {
  const context = useContext(EvaContext);
  if (!context) {
    throw new Error("useEva must be used within an EvaProvider");
  }
  return context;
};