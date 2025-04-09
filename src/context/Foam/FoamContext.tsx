import React, { createContext, useContext, useState } from "react";
import { Foam, FoamPrecio } from "../Interfaces/interfaces"; // Asegúrate de que la ruta sea correcta


interface FoamContextProps {
  foam: Foam[];
  setFoam: React.Dispatch<React.SetStateAction<Foam[]>>;
  foamprecio: FoamPrecio[];
  setFoamprecio: React.Dispatch<React.SetStateAction<FoamPrecio[]>>;
  selectedFoam: string;
  setSelectedFoam: React.Dispatch<React.SetStateAction<string>>;
  selectedMedidaPrecioRollos: {medida: string; precio: number; anchorollo:number;largorollo:number} | null;
  setSelectedMedidaPrecioRollos: React.Dispatch<React.SetStateAction<{medida: string; precio: number; anchorollo:number;largorollo:number} | null>>;
  selectedMedidaPrecioRollosLaminados: {medida: string; precio: number; anchorollo:number;largorollo:number};
  setSelectedMedidaPrecioRollosLaminados: React.Dispatch<React.SetStateAction<{medida: string; precio: number; anchorollo:number;largorollo:number}>>;
  selectedRolloType: string;
  setSelectedRolloType: React.Dispatch<React.SetStateAction<string>>;
  selectedRolloTypeLaminado: string;
  setSelectedRolloTypeLaminado: React.Dispatch<React.SetStateAction<string>>;
  
}

const FoamContext = createContext<FoamContextProps | undefined>(undefined);

export const FoamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foam, setFoam] = useState<Foam[]>([]); // Lista de foams
  // Lista de medidas y precios
  const [foamprecio, setFoamprecio] = useState<FoamPrecio[]>([]); // Lista de precios
  // Estado para manejar el foam seleccionado
  const [selectedFoam, setSelectedFoam] = useState<string>(""); // Foam seleccionado
  const [selectedMedidaPrecioRollos, setSelectedMedidaPrecioRollos] = useState<{ medida: string; precio: number; anchorollo:number; largorollo:number } | null>(null);
  // Medida/Precio para Rollos
  const [selectedMedidaPrecioRollosLaminados, setSelectedMedidaPrecioRollosLaminados] = useState<{ medida: string; precio: number; anchorollo:number; largorollo:number } | null>(null); // Medida/Precio para Rollos Laminados
  const [selectedRolloType, setSelectedRolloType] = useState<string>(""); // Tipo de Rollo seleccionado
  const [selectedRolloTypeLaminado, setSelectedRolloTypeLaminado] = useState<string>(""); // Tipo de Rollo Laminado seleccionado
  return (
    <FoamContext.Provider
      value={{
        foam,
        setFoam,
      foamprecio,
        setFoamprecio,
        selectedFoam,
        setSelectedFoam,
        selectedMedidaPrecioRollos,
        setSelectedMedidaPrecioRollos,
        selectedMedidaPrecioRollosLaminados,
        setSelectedMedidaPrecioRollosLaminados,
        selectedRolloType,
        setSelectedRolloType,
        selectedRolloTypeLaminado, // Agregar esta línea
        setSelectedRolloTypeLaminado,
      }}
    >
      {children}
    </FoamContext.Provider>
  );
};

export const useFoamContext = (): FoamContextProps => {
  const context = useContext(FoamContext);
  if (!context) {
    throw new Error("useFoamContext debe usarse dentro de un FoamProvider");
  }
  return context;
};