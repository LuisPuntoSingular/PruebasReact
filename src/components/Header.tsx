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
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { useAuth } from "@/context/GlobalApis/AuthContext";

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#1F2937",
  boxShadow: "0 2px 8px #00000022",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4.5),
  height: theme.spacing(4.5),
  border: `2px solid #7C3AED`,
  background: "#fff",
}));

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleLogout, user } = useAuth();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = async () => {
    setAnchorEl(null);
    await handleLogout();
  };

  return (
    <StyledAppBar position="static" elevation={3}>
      <Toolbar sx={{ minHeight: 68, px: 3, display: "flex", justifyContent: "space-between" }}>
        {/* Menú lateral */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StyledIconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 1 }}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </StyledIconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: "1px",
              color: "#fff",
              fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
              userSelect: "none",
            }}
          >
            My Enterprise App
          </Typography>
        </Box>

        {/* Acciones y usuario */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notificaciones */}
          <Tooltip title="Notificaciones">
            <Badge color="secondary" variant="dot" overlap="circular">
              <StyledIconButton color="inherit" aria-label="notifications">
                <NotificationsIcon sx={{ fontSize: 26 }} />
              </StyledIconButton>
            </Badge>
          </Tooltip>

          {/* Separador */}
          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#374151", mx: 1, height: 36 }} />

          {/* Avatar y email */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Opciones de usuario">
              <StyledIconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <StyledAvatar alt="User Profile" src="/profile.jpg" />
              </StyledIconButton>
            </Tooltip>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "1.08rem",
                letterSpacing: 0.2,
                display: { xs: "none", sm: "block" },
                maxWidth: 140,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {typeof user?.email === "string" ? user.email : "Usuario"}
            </Typography>
          </Box>
        </Box>

        {/* Menú desplegable */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: "#374151",
              color: "#fff",
              minWidth: 180,
              borderRadius: 2,
              boxShadow: "0 4px 16px #00000022",
              mt: 1,
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ color: "#fff", fontWeight: 500 }}>
            Perfil
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: "#fff", fontWeight: 500 }}>
            Configuración
          </MenuItem>
          <Divider sx={{ bgcolor: "#4B5563", my: 0.5 }} />
          <MenuItem onClick={handleLogoutClick} sx={{ color: "#F87171", fontWeight: 600 }}>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
}