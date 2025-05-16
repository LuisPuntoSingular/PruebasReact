import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Business,
  EventAvailable, // Ícono relacionado con asistencias
  Dashboard,
  People,
  PersonAdd,
  AttachMoney
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import FloatingWindow from "../components/OpenWindow";

// Estilo personalizado para el Drawer
const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    background: "linear-gradient(to bottom, #1e1e2f, #121212)",
    color: "#ffffff",
    width: 300,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    transition: "background 0.3s ease-in-out",
  },
});

// Estilo para los botones interactivos
const StyledListItemButton = styled(ListItemButton)({
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

// Estilo para los íconos
const StyledListItemIcon = styled(ListItemIcon)({
  color: "#ffffff",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#03a9f4",
  },
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

  const handleOpenFloatingWindow = () => {
    setShowFloatingWindow(true);
  };

  const handleCloseFloatingWindow = () => {
    setShowFloatingWindow(false);
  };

  const handleToggleVentas = () => {
    setOpenVentas(!openVentas);
  };

  const handleToggleRecursosHumanos = () => {
    setOpenRecursosHumanos(!openRecursosHumanos);
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoToAddEmployee = () => {
    router.push("/humanresources");
  };

  const handleGoToModified = () => {
    router.push("/editprices");
  };

  const handleGoToPayrollHR = () => {
    router.push("/payrollhumanresources");
  };

  const handleGoToIncidents = () => {
    router.push("/incidents");
  };

  return (
    <>
      <StyledDrawer anchor="left" open={open} onClose={onClose}>
        {/* Encabezado del Sidebar */}
        <Box
          sx={{
            padding: "20px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Panel Empresarial
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Gestión y control
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Lista de opciones */}
        <List>
          {/* Dashboard */}
          <StyledListItemButton onClick={handleGoToDashboard}>
            <StyledListItemIcon>
              <Dashboard />
            </StyledListItemIcon>
            <ListItemText primary="Dashboard" />
          </StyledListItemButton>

          {/* Ventas con submenú */}
          <StyledListItemButton onClick={handleToggleVentas}>
            <StyledListItemIcon>
              <Business />
            </StyledListItemIcon>
            <ListItemText primary="Ventas" />
            {openVentas ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openVentas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{
                  pl: 4,
                }}
                onClick={handleOpenFloatingWindow}
              >
                <StyledListItemIcon>
                  <EventAvailable /> {/* Cambiado a EventAvailable */}
                </StyledListItemIcon>
                <ListItemText primary="Cotizador" />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{
                  pl: 4,
                }}
                onClick={handleGoToModified}
              >
                <StyledListItemIcon>
                  <EventAvailable /> {/* Cambiado a EventAvailable */}
                </StyledListItemIcon>
                <ListItemText primary="Editar Precios" />
              </StyledListItemButton>
            </List>
          </Collapse>

          {/* Recursos Humanos con submenú */}
          <StyledListItemButton onClick={handleToggleRecursosHumanos}>
            <StyledListItemIcon>
              <People />
            </StyledListItemIcon>
            <ListItemText primary="Recursos Humanos" />
            {openRecursosHumanos ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openRecursosHumanos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledListItemButton
                sx={{
                  pl: 4,
                }}
                onClick={handleGoToAddEmployee}
              >
                <StyledListItemIcon>
                  <PersonAdd />
                </StyledListItemIcon>
                <ListItemText primary="Agregar Empleado" />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{
                  pl: 4,
                }}
                onClick={handleGoToPayrollHR}
              >
                <StyledListItemIcon>
                  <AttachMoney /> {/* Cambiado a EventAvailable */}
                </StyledListItemIcon>
                <ListItemText primary="Nómina RH" />
              </StyledListItemButton>
              <StyledListItemButton
                sx={{
                  pl: 4,
                }}
                onClick={handleGoToIncidents}
              >
                <StyledListItemIcon>
                  <EventAvailable /> {/* Cambiado a EventAvailable */}
                </StyledListItemIcon>
                <ListItemText primary="Incidencias" />
              </StyledListItemButton>
            </List>
          </Collapse>
        </List>
      </StyledDrawer>

      {/* Ventana flotante */}
      {showFloatingWindow && <FloatingWindow onClose={handleCloseFloatingWindow} />}
    </>
  );
}