import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FloatingWindow from "../components/OpenWindow";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);

  const handleOpenFloatingWindow = () => {
    setShowFloatingWindow(true);
  };

  const handleCloseFloatingWindow = () => {
    setShowFloatingWindow(false);
  };

  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <List>
          <ListItemButton onClick={handleOpenFloatingWindow}>
            <ListItemText primary="Abrir Ventana Flotante" />
          </ListItemButton>
        </List>
      </Drawer>
      {showFloatingWindow && <FloatingWindow onClose={handleCloseFloatingWindow} />}
    </>
  );
}