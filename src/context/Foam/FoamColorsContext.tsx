import React, { createContext, useContext, useState, useEffect } from "react";


interface Color {
  id: number;
  color: string;
  anchoplaca: number;
  largoplaca: number;
}


interface ColorPrecio {
  id: number;
  medida: string;
  precio: string;
  idcoloresfoam: number;
}

interface FoamColorsContextProps {
  colores: Color[];
  setColores: React.Dispatch<React.SetStateAction<Color[]>>;
  selectedColor: {id:number ;color: string; anchoplaca: number; largoplaca: number}| null;
  setSelectedColor: React.Dispatch<React.SetStateAction<{id:number ;color: string; anchoplaca: number; largoplaca: number}| null>>;
  coloresPrecio: ColorPrecio[];
  setColoresPrecio: React.Dispatch<React.SetStateAction<ColorPrecio[]>>;
  selectedColorPrecio: {id: number; medida: string; precio: string; idcoloresfoam: number} | null;
  setSelectedColorPrecio: React.Dispatch<React.SetStateAction<{id: number; medida: string; precio: string; idcoloresfoam: number} |null>>;
}

const FoamColorsContext = createContext<FoamColorsContextProps | undefined>(undefined);

export const FoamColorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colores, setColores] = useState<Color[]>([]); // Lista de colores
  const [selectedColor, setSelectedColor] = useState<{id:number ; color: string; anchoplaca: number; largoplaca: number}| null>(null); // Color seleccionado
  const [coloresPrecio, setColoresPrecio] = useState<ColorPrecio[]>([]); // Lista de colores con precios
  const [selectedColorPrecio, setSelectedColorPrecio] = useState<{id: number; medida: string; precio: string; idcoloresfoam: number} | null>(null); // Color con precio seleccionado





  // Cargar datos de colores desde la API
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL_COLORESFOAM || "");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de colores desde la API");
        }
        const data: Color[] = await response.json();
        setColores(data); // Guardar los colores en el estado
      } catch (error) {
        console.error("Error al cargar los colores:", error);
      }
    };

    fetchColors();
  }, []);

  // Cargar datos de colores con precios desde la API
  useEffect(() => {
    const fetchColorsWithPrices = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL_COLORESFOAM || "");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de colores con precios desde la API");
        }
        const data: ColorPrecio[] = await response.json();
        setColoresPrecio(data); // Guardar los colores con precios en el estado
      } catch (error) {
        console.error("Error al cargar los colores con precios:", error);
      }
    };

    fetchColorsWithPrices();
  }, []);

  return (
    <FoamColorsContext.Provider
      value={{
        colores,
        setColores,
        selectedColor,
        setSelectedColor,
        coloresPrecio,
        setColoresPrecio,
        selectedColorPrecio,
        setSelectedColorPrecio,
      }}
    >
      {children}
    </FoamColorsContext.Provider>
  );
};

export const useFoamColorsContext = (): FoamColorsContextProps => {
  const context = useContext(FoamColorsContext);
  if (!context) {
    throw new Error("useFoamColorsContext debe usarse dentro de un FoamColorsProvider");
  }
  return context;
};