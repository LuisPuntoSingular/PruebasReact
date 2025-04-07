import React, { createContext, useContext, useState } from "react";

type Row = {
  largo: string;
  ancho: string;
  espesor: string;
  cantidad: string;
};

interface PalletsContextProps {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  calculateRowValue: (row: Row) => number;
  calculateTotal: () => number; // Exponer calculateTotal
}

const PalletsContext = createContext<PalletsContextProps | undefined>(undefined);

export const PalletsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rows, setRows] = useState<Row[]>([
    { largo: "", ancho: "", espesor: "", cantidad: "1" }, // Fila inicial
  ]);

  const calculateRowValue = (row: Row): number => {
    const largo = parseFloat(row.largo) || 0;
    const ancho = parseFloat(row.ancho) || 0;
    const espesor = parseFloat(row.espesor) || 0;
    const cantidad = parseFloat(row.cantidad) || 0;

    return (((largo * ancho * espesor) / 144) * cantidad) * 15;
  };

  const calculateTotal = (): number => {
    return rows.reduce((sum, row) => sum + calculateRowValue(row), 0);
  };

  return (
    <PalletsContext.Provider value={{ rows, setRows, calculateRowValue, calculateTotal }}>
      {children}
    </PalletsContext.Provider>
  );
};

export const usePallets = (): PalletsContextProps => {
  const context = useContext(PalletsContext);
  if (!context) {
    throw new Error("usePallets must be used within a PalletsProvider");
  }
  return context;
};