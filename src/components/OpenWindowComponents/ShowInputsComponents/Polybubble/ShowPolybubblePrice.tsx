import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PolybubbleIndex from "@/context/PolybubbleContext/PolybubbleIndex";

const CalculatorContainer = styled(Paper)(() => ({
  width: "100%",
  maxWidth: "400px", // Ancho máximo para mantener el diseño compacto
  background: "rgba(255, 255, 255, 0.08)", // Fondo más claro para contraste
  color: "#ffffff",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column", // Cambiado a columna para separar los contenedores
  gap: "16px", // Espaciado entre los contenedores
}));

const SectionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row", // Mantiene los elementos en fila dentro de cada sección
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px", // Espaciado entre los elementos
}));

const Display = styled(Box)(() => ({
  flex: 1, // Cada display ocupa el mismo espacio
  background: "rgba(0, 0, 0, 0.2)", // Fondo oscuro para contraste
  borderRadius: "8px",
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.2)", // Borde definido
  padding: "8px",
}));

const TitleText = styled(Typography)(() => ({
  fontSize: "0.85rem",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.7)",
  marginBottom: "4px",
}));

const ValueText = styled(Typography)(() => ({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ffffff",
}));

export default function ShowFoamPrice() {
 // Obtener los valores de FoamIndex
  // Aquí puedes usar los valores de partA, partB, precioA y precioB para mostrarlos en el componente
const {partA,partB,precioA,precioB}= PolybubbleIndex()
  return (
    <CalculatorContainer>
      {/* Contenedor para las piezas */}

      <SectionContainer>
        <Display>
          
          <TitleText>Piezas Parte A</TitleText>
          <ValueText>{(partA).toFixed(0)}</ValueText>
        </Display>
        <Display>
          <TitleText>Piezas Parte B</TitleText>
          <ValueText>{(partB).toFixed(0)}</ValueText>
        </Display>
      </SectionContainer>

      {/* Contenedor para los precios */}
      <SectionContainer>
        <Display>
          <TitleText>Precio por Pieza A</TitleText>
          <ValueText>${(precioA).toFixed(2)}</ValueText>
        </Display>
        <Display>
          <TitleText>Precio por Pieza B</TitleText>
          <ValueText>${(precioB).toFixed(2)}</ValueText>
        </Display>
      </SectionContainer>
    </CalculatorContainer>
  );
}