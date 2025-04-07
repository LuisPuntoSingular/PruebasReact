import React, { createContext, useContext, useState } from "react";

// Interfaces para tipar los datos
interface SelectedPoliburbujaPrecio {
  medida: string;
  precio: string;
  ancho: number;
  largo: number;
}

// Tipos para el contexto
interface PolybubbleContextType {
  selectedPoliburbuja: number | null;
  setSelectedPoliburbuja: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPoliburbujaPrecio: SelectedPoliburbujaPrecio | null;
  setSelectedPoliburbujaPrecio: React.Dispatch<React.SetStateAction<SelectedPoliburbujaPrecio | null>>;
}

// Crear el contexto
const PolybubbleContext = createContext<PolybubbleContextType | undefined>(undefined);

// Proveedor del contexto
export const PolybubbleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPoliburbuja, setSelectedPoliburbuja] = useState<number | null>(null);
  const [selectedPoliburbujaPrecio, setSelectedPoliburbujaPrecio] = useState<SelectedPoliburbujaPrecio | null>(null);

  return (
    <PolybubbleContext.Provider
      value={{
        selectedPoliburbuja,
        setSelectedPoliburbuja,
        selectedPoliburbujaPrecio,
        setSelectedPoliburbujaPrecio,
      }}
    >
      {children}
    </PolybubbleContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePolybubbleContext = () => {
  const context = useContext(PolybubbleContext);
  if (!context) {
    throw new Error("usePolybubbleContext debe usarse dentro de un PolybubbleProvider");
  }
  return context;
};