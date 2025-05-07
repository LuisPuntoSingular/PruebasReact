import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar"; // Importar Avatar para StyledAvatar
import { useRouter } from "next/router"; // Importar useRouter para redirección

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));
const StyledAppBar = styled(AppBar)(({  }) => ({
  backgroundColor: "#1F2937", // Fondo oscuro
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

// Define the HeaderProps interface
interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter(); // Hook para redirección en Next.js

  // Simulación del rol del usuario
   //let userRole = "admin"; // Cambiar a "user" para probar el comportamiento

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setAnchorEl(null);
    router.push("/adminconfigurations"); // Redirigir a adminconfigurations
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
            color: "#ffffff", // Texto blanco
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
          PaperProps={{
            sx: {
              backgroundColor: "#374151", // Fondo oscuro del menú
              color: "#ffffff", // Texto blanco
            },
          }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ color: "#ffffff" }}>
            Profile
          </MenuItem>
         
          <MenuItem onClick={handleSettingsClick} sx={{ color: "#ffffff" }}>
            Settings
          </MenuItem>
          
          <MenuItem onClick={handleMenuClose} sx={{ color: "#ffffff" }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
}