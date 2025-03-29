import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ShowInputs from "./OpenWindowComponents/ShowInputs";
import MaterialInput from "./OpenWindowComponents/MaterialInput";
import ShowPrice from "./OpenWindowComponents/ShowPrice";
import { Box } from "@mui/material";

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
  zIndex: 1300,
  overflowY: "auto", // Permite desplazamiento si el contenido excede la altura
  maxHeight: "90vh", // Limita la altura máxima al 90% de la pantalla
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "auto",
    padding: "12px",
  },
}));

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

export default function FloatingWindow({ onClose }: FloatingWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [selectedMaterial, setSelectedMaterial] = useState("");

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

  const handleDragStart = () => {
    if (!isDesktop) return;
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    if (!isDesktop) return;
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !isDragging) return;
    const newX = position.x + e.movementX;
    const newY = position.y + e.movementY;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

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
          Ventana Flotante
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
          selectedMaterial={selectedMaterial}
          handleMaterialChange={(event) => setSelectedMaterial(event.target.value)}
        />
        <Box  sx={{ width: "100%", maxWidth: "400px" }}>
          <ShowInputs  selectedMaterial={selectedMaterial} />
        </Box>
      </Section>

      {/* Sección 3 */}
      <Section>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Componente 3
        </Typography>
        <Button variant="outlined" color="success">
          Acción 3
        </Button>
      </Section>
    </FloatingContainer>
  );
}