import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { styled } from "@mui/material/styles";

interface HeaderProps {
  onMenuClick: () => void; // Función para manejar el clic en el menú
}

// Estilo personalizado para el AppBar con colores oscuros y animaciones
const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(90deg, #1e1e2f 0%, #121212 100%)", // Fondo oscuro con degradado
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Sombra para profundidad
  transition: "background 0.3s ease-in-out",
});

// Estilo para los botones interactivos
const StyledIconButton = styled(IconButton)({
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)", // Animación de escala al pasar el cursor
  },
});

// Estilo para el avatar
const StyledAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  border: "2px solid #ffffff",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 0px 10px 2px rgba(255, 255, 255, 0.8)", // Sombra al pasar el cursor
  },
});

export default function Header({ onMenuClick }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Botón del menú */}
        <StyledIconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </StyledIconButton>

        {/* Título */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            color: "#ffffff",
          }}
        >
          My Enterprise App
        </Typography>

        {/* Botón de notificaciones */}
        <StyledIconButton color="inherit" aria-label="notifications">
          <NotificationsIcon />
        </StyledIconButton>

        {/* Avatar con menú desplegable */}
        <StyledIconButton onClick={handleAvatarClick}>
          <StyledAvatar alt="User Profile" src="/profile.jpg" />
        </StyledIconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
}