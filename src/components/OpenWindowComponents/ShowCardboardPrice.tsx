import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCalculos } from "@/context/CardBoardContext/Cardboardindex"; // Importar el hook para cálculos


const CalculatorContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px", // Ancho máximo para mantener el diseño compacto
  background: "rgba(255, 255, 255, 0.08)", // Fondo más claro para contraste
  color: "#ffffff",
  borderRadius: "12px",
  padding: "3px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "row", // Mantiene los elementos en fila
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px", // Espaciado entre los elementos
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row", // Mantiene fila en pantallas pequeñas
    padding: "10px",
    gap: "6px",
  },
}));

const Display = styled(Box)(({ theme }) => ({
  flex: 1, // Cada display ocupa el mismo espacio
  background: "rgba(0, 0, 0, 0.2)", // Fondo oscuro para contraste
  borderRadius: "8px",
  
 
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.2)", // Borde definido
  [theme.breakpoints.down("sm")]: {
    padding: "8px",
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.7)",
  marginBottom: "4px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export default function ShowPrice() {
  const { precioventa, preciocosto, minimo  } = useCalculos();


  return (
    <CalculatorContainer > 
      {/* Precio costo */}
      <Display >
        <TitleText > Costo</TitleText>
        <ValueText>${preciocosto.toFixed(4)}</ValueText>
      </Display>

      {/* Precio venta */}
      <Display>
        <TitleText> Venta</TitleText>
        <ValueText>${precioventa.toFixed(4)}</ValueText>
      </Display>

      {/* Precio mínimo */}
      <Display>
        <TitleText> Mínimo</TitleText>
        <ValueText>${minimo.toFixed(2)}</ValueText>
      </Display>
    </CalculatorContainer>
  );
}