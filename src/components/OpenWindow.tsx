import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


import ShowInputs from "./OpenWindowComponents/ShowInputs";
import MaterialInput from "./OpenWindowComponents/ShowMaterialInput";
import ShowPrice from "./OpenWindowComponents/ShowPrice";

import { Box } from "@mui/material";
import ShowMeasures from "./OpenWindowComponents/ShowMeasures";
import ShowUtil from "./OpenWindowComponents/ShowUtil";
/// Estilo para la ventana flotante
/// @param theme Tema de Material-UI
const FloatingContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  background: "#1e1e2f",
  color: "#ffffff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
  borderRadius: "8px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  zIndex: 1100,
  overflowY: "auto", // Permite desplazamiento si el contenido excede la altura
  maxHeight: "90vh", // Limita la altura máxima al 90% de la pantalla
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "auto",
    padding: "12px",
  },
}));
/// Estilo para las secciones dentro de la ventana flotante
/// @param theme Tema de Material-UI
const Section = styled("div")(({ theme }) => ({
  flex: 1,
  padding: "8px",
  marginBottom: "8px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    padding: "6px",
    marginBottom: "6px",
  },
}));
interface FloatingWindowProps {
  onClose: () => void;
}


type Row = {
  part: string;
  largo: string;
  ancho: string;
  cantidad: string;
};



/// Componente de ventana flotante
/// @param onClose Función para cerrar la ventana
/// @returns Componente de ventana flotante
/// @description Este componente representa una ventana flotante que se puede arrastrar y soltar en la pantalla. Contiene varias secciones con diferentes funcionalidades.
export default function FloatingWindow({ onClose }: FloatingWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  /// Estado para el material seleccionado
  /// @param selectedMaterial Material seleccionado

 const [rows, setRows] = useState<Row[]>([
    { part: "A", largo: "", ancho: "", cantidad: "1" },
  ]);


  // Centrar la ventana solo al cargar
  useEffect(() => {
    const initialX = Math.max((window.innerWidth - 400) / 2, 10); // Centrado horizontalmente
    const initialY = Math.max((window.innerHeight - 300) / 2 - 100, 10);// Centrado verticalmente
    setPosition({ x: initialX, y: initialY });

    // Detectar si es escritorio o móvil
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
/// Manejar el evento de arrastre y soltar
  /// @param e Evento de mouse
  const handleDragStart = () => {
    if (!isDesktop) return;
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    if (!isDesktop) return;
    setIsDragging(false);
  };
/// Manejar el movimiento del mouse
  /// @param e Evento de mouse
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !isDragging) return;
    const newX = position.x + e.movementX;
    const newY = position.y + e.movementY;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

 
/// Manejar el cambio de filas en la rejilla
  /// @param index Índice de la fila
  const handleInputChangeRejilla = (index: number, field: keyof Row, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };
/// Manejar el cambio de total

    
  return (
    <FloatingContainer
      style={{
        top: position.y,
        left: position.x,
        width: "400px",
      }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      onMouseLeave={handleMouseLeave}
    >
      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: "#ffffff" }}>
        
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#ffffff" }}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Sección 1: Mostrar el componente ShowPrice */}
      <Section>
        <ShowPrice />
      </Section>

      {/* Sección 2: Lista desplegable */}
      <Section>
        <MaterialInput
       
           />
        <Box  sx={{ width: "100%", maxWidth: "400px" }}>
          <ShowInputs  
         
    
          />
        </Box>
        <ShowUtil/>
      </Section>

      {/* Sección 3 */}
      <Section>
      <ShowMeasures
       
        rows={rows}
        handleInputChangeRejilla={handleInputChangeRejilla}
   
 
  
      />
      </Section>
    </FloatingContainer>
  );
}