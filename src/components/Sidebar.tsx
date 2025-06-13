import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Business,
  Dashboard,
  People,
  Edit,
  AssignmentInd,
  GroupAdd,
  MonetizationOn,
  Calculate,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";
import { useRouter } from "next/router";
import FloatingWindow from "../components/OpenWindow";

// Animaciones para la caja armándose
const boxBounce = keyframes`
  0%, 100% { transform: translateY(0);}
  60% { transform: translateY(-8px);}
`;

const flapLeft = keyframes`
  0% { transform: rotateY(90deg);}
  40% { transform: rotateY(0deg);}
  100% { transform: rotateY(0deg);}
`;

const flapRight = keyframes`
  0% { transform: rotateY(-90deg);}
  40% { transform: rotateY(0deg);}
  100% { transform: rotateY(0deg);}
`;

const flapTop = keyframes`
  0% { transform: rotateX(90deg);}
  60% { transform: rotateX(0deg);}
  100% { transform: rotateX(0deg);}
`;

const boxBody = keyframes`
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 1; }
`;

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    background: "#21222B",
    color: "#f3f4f6",
    width: 250,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)",
    borderRight: "1px solid #23243a",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
    padding: 0,
  },
});

const StyledListItemButton = styled(ListItemButton)({
  borderRadius: 4,
  margin: "2px 8px",
  padding: "7px 12px",
  transition: "background 0.18s, color 0.18s",
  "&:hover": {
    backgroundColor: "#283046",
    color: "#2563eb",
    "& .MuiListItemIcon-root": {
      color: "#2563eb",
    },
  },
});

const StyledListItemIcon = styled(ListItemIcon)({
  color: "#b0b3c7",
  minWidth: 36,
  fontSize: 22,
});

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [openVentas, setOpenVentas] = useState(false);
  const [openRecursosHumanos, setOpenRecursosHumanos] = useState(false);
  const router = useRouter();

  const handleOpenFloatingWindow = () => setShowFloatingWindow(true);
  const handleCloseFloatingWindow = () => setShowFloatingWindow(false);

  const handleToggleVentas = () => setOpenVentas(!openVentas);
  const handleToggleRecursosHumanos = () => setOpenRecursosHumanos(!openRecursosHumanos);

  const handleGoToDashboard = () => router.push("/dashboard");
  const handleGoToAddEmployee = () => router.push("/humanresources");
  const handleGoToModified = () => router.push("/editprices");
  const handleGoToPayrollHR = () => router.push("/payrollhumanresources");
  const handleGoToIncidents = () => router.push("/incidents");

  return (
    <>
      <StyledDrawer anchor="left" open={open} onClose={onClose}>
        {/* Encabezado del Sidebar con animación de caja armándose */}
        <Box
          sx={{
            padding: "18px 18px 10px 18px",
            textAlign: "left",
            borderBottom: "1px solid #23243a",
            background: "#21222B",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minHeight: 64,
            position: "relative",
          }}
        >
          {/* Caja armándose */}
          <Box
            sx={{
              width: 44,
              height: 44,
              position: "relative",
              perspective: 80,
              animation: `${boxBounce} 1.8s infinite cubic-bezier(.68,-0.55,.27,1.55)`,
              mr: 1,
            }}
          >
            {/* Solapa izquierda */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 12,
                width: 14,
                height: 20,
                background: "#e0b97d",
                borderRadius: "2px 0 2px 2px",
                transformOrigin: "right center",
                animation: `${flapLeft} 1.1s 0.1s cubic-bezier(.68,-0.55,.27,1.55) forwards`,
                boxShadow: "0 1px 2px #0002",
                zIndex: 2,
              }}
            />
            {/* Solapa derecha */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 12,
                width: 14,
                height: 20,
                background: "#e0b97d",
                borderRadius: "0 2px 2px 2px",
                transformOrigin: "left center",
                animation: `${flapRight} 1.1s 0.1s cubic-bezier(.68,-0.55,.27,1.55) forwards`,
                boxShadow: "0 1px 2px #0002",
                zIndex: 2,
              }}
            />
            {/* Cuerpo de la caja */}
            <Box
              sx={{
                position: "absolute",
                left: 7,
                top: 16,
                width: 30,
                height: 20,
                background: "#f7c873",
                borderRadius: "2px",
                boxShadow: "0 2px 6px #0003",
                zIndex: 1,
                animation: `${boxBody} 0.7s 0.5s both`,
              }}
            />
            {/* Tapa superior */}
            <Box
              sx={{
                position: "absolute",
                left: 7,
                top: 4,
                width: 30,
                height: 14,
                background: "#e0b97d",
                borderRadius: "2px 2px 4px 4px",
                transformOrigin: "top center",
                animation: `${flapTop} 1.3s 0.4s cubic-bezier(.68,-0.55,.27,1.55) forwards`,
                boxShadow: "0 2px 6px #0002",
                zIndex: 3,
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#f3f4f6",
              letterSpacing: 1,
              fontSize: "1.35rem",
              ml: 0.5,
              userSelect: "none",
            }}
          >
            Autopack
          </Typography>
        </Box>

        {/* Menú SIEMPRE arriba */}
        <Box sx={{ flex: 1, overflowY: "auto", pt: 1 }}>
          <List>
            <StyledListItemButton onClick={handleGoToDashboard}>
              <StyledListItemIcon>
                <Dashboard />
              </StyledListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 500, fontSize: "1rem" }} />
            </StyledListItemButton>

            <StyledListItemButton onClick={handleToggleVentas}>
              <StyledListItemIcon>
                <Business />
              </StyledListItemIcon>
              <ListItemText primary="Ventas" primaryTypographyProps={{ fontWeight: 500, fontSize: "1rem" }} />
              {openVentas ? <ExpandLess /> : <ExpandMore />}
            </StyledListItemButton>
            <Collapse in={openVentas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleOpenFloatingWindow}
                >
                  <StyledListItemIcon>
                    <Calculate />
                  </StyledListItemIcon>
                  <ListItemText primary="Cotizador" />
                </StyledListItemButton>
                <StyledListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleGoToModified}
                >
                  <StyledListItemIcon>
                    <Edit />
                  </StyledListItemIcon>
                  <ListItemText primary="Editar Precios" />
                </StyledListItemButton>
              </List>
            </Collapse>

            <StyledListItemButton onClick={handleToggleRecursosHumanos}>
              <StyledListItemIcon>
                <People />
              </StyledListItemIcon>
              <ListItemText primary="Recursos Humanos" primaryTypographyProps={{ fontWeight: 500, fontSize: "1rem" }} />
              {openRecursosHumanos ? <ExpandLess /> : <ExpandMore />}
            </StyledListItemButton>
            <Collapse in={openRecursosHumanos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleGoToAddEmployee}
                >
                  <StyledListItemIcon>
                    <GroupAdd />
                  </StyledListItemIcon>
                  <ListItemText primary="Agregar Empleado" />
                </StyledListItemButton>
                <StyledListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleGoToPayrollHR}
                >
                  <StyledListItemIcon>
                    <MonetizationOn />
                  </StyledListItemIcon>
                  <ListItemText primary="Nómina RH" />
                </StyledListItemButton>
                <StyledListItemButton
                  sx={{ pl: 4 }}
                  onClick={handleGoToIncidents}
                >
                  <StyledListItemIcon>
                    <AssignmentInd />
                  </StyledListItemIcon>
                  <ListItemText primary="Incidencias" />
                </StyledListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </StyledDrawer>

      {/* Ventana flotante */}
      {showFloatingWindow && <FloatingWindow onClose={handleCloseFloatingWindow} />}
    </>
  );
}