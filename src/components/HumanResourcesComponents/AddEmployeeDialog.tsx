import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Box, Button, MenuItem } from "@mui/material";
import { createEmployee } from "./employeeApi"; // Importa la función de la API

export interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => Promise<void>; // Asegúrate de que sea una función asíncrona
  refreshEmployees: () => void; 
  newEmployee: {
    
    photo: string;
    name: string;
    last_name_paterno: string;
    last_name_materno: string;
    position: string;
    salary: number;
    hire_date: string;
    phone_number?: string; // Opcional
    emergency_contact?: string; // Opcional
    nss: boolean;
    status: boolean;
  };
  setNewEmployee: React.Dispatch<React.SetStateAction<{
    photo: string;
    name: string;
    last_name_paterno: string;
    last_name_materno: string;
    position: string;
    salary: number;
    hire_date: string;
    phone_number?: string; // Opcional
    emergency_contact?: string; // Opcional
    nss: boolean;
    status: boolean;
  }>>;
}





const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({ open, onClose, refreshEmployees }) => {
  const [newEmployee, setNewEmployee] = useState({
    photo: "",
    name: "",
    last_name_paterno: "",
    last_name_materno: "",
    position: "",
    salary: "",
    hire_date: "",
    phone_number: "",
    emergency_contact: "",
    nss: false,
    status: true,
  });

  const handleSave = async () => {
    // Validar campos obligatorios
    if (
      !newEmployee.name ||
      !newEmployee.last_name_paterno ||
      !newEmployee.last_name_materno ||
      !newEmployee.position ||
      !newEmployee.salary ||
      !newEmployee.hire_date
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    try {
      await createEmployee({ ...newEmployee, salary: parseFloat(newEmployee.salary) }); // Llama a la API para crear el empleado
      refreshEmployees(); // Recarga la lista de empleados
      onClose(); // Cierra el diálogo
      setNewEmployee({
        photo: "",
        name: "",
        last_name_paterno: "",
        last_name_materno: "",
        position: "",
        salary: "",
        hire_date: "",
        phone_number: "",
        emergency_contact: "",
        nss: false,
        status: true,
      }); // Reinicia el formulario
    } catch (error) {
      console.error("Error al guardar el empleado:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1E293B", // Fondo sólido oscuro
          color: "#ffffff", // Texto blanco
          borderRadius: "16px",
          padding: "16px",
          maxWidth: "600px", // Aumenta el ancho máximo para mayor espacio
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
          borderRadius: "12px 12px 0 0",
          padding: "16px",
        }}
      >
        Agregar Nuevo Empleado
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#2D3748", // Fondo sólido para los campos
          borderRadius: "12px",
        }}
      >
        <TextField
          label="Foto (URL)"
          value={newEmployee.photo}
          onChange={(e) => setNewEmployee({ ...newEmployee, photo: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" }, // Texto blanco
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" }, // Color del label
          }}
        />
        <TextField
          label="Nombre"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Apellido Paterno"
          value={newEmployee.last_name_paterno}
          onChange={(e) => setNewEmployee({ ...newEmployee, last_name_paterno: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Apellido Materno"
          value={newEmployee.last_name_materno}
          onChange={(e) => setNewEmployee({ ...newEmployee, last_name_materno: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Puesto"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Salario"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Fecha de Ingreso"
          type="date"
          value={newEmployee.hire_date}
          onChange={(e) => setNewEmployee({ ...newEmployee, hire_date: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            shrink: true,
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Teléfono"
          value={newEmployee.phone_number}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone_number: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="Contacto de Emergencia"
          value={newEmployee.emergency_contact}
          onChange={(e) => setNewEmployee({ ...newEmployee, emergency_contact: e.target.value })}
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        />
        <TextField
          label="NSS"
          value={newEmployee.nss ? "Sí" : "No"}
          onChange={(e) => setNewEmployee({ ...newEmployee, nss: e.target.value === "Sí" })}
          select
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        >
          <MenuItem value="Sí">Sí</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>
        <TextField
          label="Estatus"
          value={newEmployee.status ? "Activo" : "Inactivo"}
          onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value === "Activo" })}
          select
          fullWidth
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#A0AEC0" },
          }}
        >
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="Inactivo">Inactivo</MenuItem>
        </TextField>
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
            backgroundColor: "#EF4444",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#DC2626" },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#10B981",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#059669" },
          }}
        >
          Guardar
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddEmployeeDialog;