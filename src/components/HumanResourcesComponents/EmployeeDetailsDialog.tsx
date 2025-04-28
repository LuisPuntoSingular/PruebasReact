import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from "@mui/material";

interface EmployeeDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  employee: {
    name: string;
    lastNamePaterno: string;
    lastNameMaterno: string;
    phoneNumber: string;
    emergencyContact: string;
    hireDate: string;
   
  } | null;
}

const EmployeeDetailsDialog: React.FC<EmployeeDetailsDialogProps> = ({ open, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(31, 41, 55, 0.9)", // Fondo oscuro con transparencia
          color: "#ffffff", // Texto blanco
          borderRadius: "16px", // Bordes redondeados
          padding: "16px",
          maxWidth: "500px",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1E3A8A", // Fondo azul oscuro
          color: "#ffffff", // Texto blanco
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "12px 12px 0 0", // Bordes redondeados solo en la parte superior
          padding: "16px",
        }}
      >
        Detalles de {employee.name}
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography>
          <strong>Apellido Paterno:</strong> {employee.lastNamePaterno}
        </Typography>
        <Typography>
          <strong>Apellido Materno:</strong> {employee.lastNameMaterno}
        </Typography>
        <Typography>
          <strong>Teléfono:</strong> {employee.phoneNumber}
        </Typography>
        <Typography>
          <strong>Contacto de Emergencia:</strong> {employee.emergencyContact}
        </Typography>
        <Typography>
          <strong>Fecha de Ingreso:</strong> {employee.hireDate}
        </Typography>
       
      </DialogContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
          gap: "8px",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#EF4444", // Rojo para el botón de cerrar
            color: "#ffffff",
            "&:hover": { backgroundColor: "#DC2626" },
            textTransform: "none",
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;