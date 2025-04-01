import React, { createContext, useContext, useState } from "react";

type Row = {
  part: string;
  largo: string;
  ancho: string;
  cantidad: string;
};

interface MeasuresContextType {
  largo: number | "";
  setLargo: React.Dispatch<React.SetStateAction<number | "">>;
  ancho: number | "";
  setAncho: React.Dispatch<React.SetStateAction<number | "">>;
  alto: number | "";
  setAlto: React.Dispatch<React.SetStateAction<number | "">>;
  cantidad: number | "";
  setCantidad: React.Dispatch<React.SetStateAction<number | "">>;
  rejillaRows: Row[]; // Nuevo estado para las filas de la tabla
  setRejillaRows: React.Dispatch<React.SetStateAction<Row[]>>; // Setter para las filas
  rejillaTotal: number; // Nuevo estado para el total calculado
  setRejillaTotal: React.Dispatch<React.SetStateAction<number>>; // Setter para el total
  totalCantidad: number; // Nuevo estado para la cantidad total
  setTotalCantidad: React.Dispatch<React.SetStateAction<number>>; // Setter para la cantidad total

}

const MeasuresContext = createContext<MeasuresContextType | undefined>(undefined);

export const MeasuresProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [largo, setLargo] = useState<number | "">("");
  const [ancho, setAncho] = useState<number | "">("");
  const [alto, setAlto] = useState<number | "">("");
  const [cantidad, setCantidad] = useState<number | "">("");
  const [rejillaRows, setRejillaRows] = useState<Row[]>([]); // Inicializar filas
  const [rejillaTotal, setRejillaTotal] = useState<number>(0); // Inicializar total
  const [totalCantidad, setTotalCantidad] = useState<number>(0); // Inicializar cantidad total

    // Aquí puedes agregar más estados si es necesario
  return (
    <MeasuresContext.Provider value={{ largo, setLargo, ancho, setAncho, alto, setAlto, cantidad, setCantidad,
      rejillaRows, // Exponer filas
      setRejillaRows, // Exponer setter de filas
      rejillaTotal, // Exponer total
      setRejillaTotal,
      totalCantidad, // Exponer cantidad total
      setTotalCantidad,
     }}>
      {children}
    </MeasuresContext.Provider>
  );
};

export const useMeasures = () => {
    const context = useContext(MeasuresContext);
    if (!context) {
        throw new Error("useMeasures must be used within a MeasuresProvider");
    }
    return context;
};