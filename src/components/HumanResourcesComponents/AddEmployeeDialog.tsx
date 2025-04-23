import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  MenuItem,
} from "@mui/material";

interface Employee {
  id?: number; // Opcional si no está presente al crear un nuevo empleado
  photo: string;
  name: string;
  last_name_paterno: string;
  last_name_materno: string;
  position: string;
  salary: number;
  hire_date: string;
  phone_number?: string;
  emergency_contact?: string;
  nss: boolean;
  status: boolean;
}


interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  refreshEmployees: () => Promise<void>;
  newEmployee: Employee; // Add this line to include the newEmployee property
  setNewEmployee: React.Dispatch<React.SetStateAction<Employee>>;
  onSave: () => Promise<void>;
}
const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({
  open,
  onClose,
  refreshEmployees,
}) => {
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
      // Aquí iría la lógica para guardar el empleado
      refreshEmployees();
      onClose();
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
      });
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
          backgroundColor: "#1E293B", // Fondo oscuro
          color: "#ffffff", // Texto blanco
          borderRadius: "16px",
          padding: "16px",
          maxWidth: "600px",
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
    backgroundColor: "#FFFFFF", // Fondo blanco
    borderRadius: "12px",
  }}
>
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
    }}
  >
    {/* Foto */}
    <Box sx={{ flex: "1 1 100%" }}>
      <TextField
        label="Foto (URL)"
        value={newEmployee.photo}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, photo: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" }, // Color del label
        }}
      />
    </Box>

    {/* Nombres y Apellidos */}
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Nombre"
        value={newEmployee.name}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, name: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Apellido Paterno"
        value={newEmployee.last_name_paterno}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            last_name_paterno: e.target.value,
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Apellido Materno"
        value={newEmployee.last_name_materno}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            last_name_materno: e.target.value,
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>

    {/* Datos laborales */}
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Puesto"
        value={newEmployee.position}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, position: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Salario"
        value={newEmployee.salary}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, salary: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Fecha de Ingreso"
        type="date"
        value={newEmployee.hire_date}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, hire_date: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { color: "#6B7280" },
        }}
      />
    </Box>

    {/* Contactos */}
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Teléfono"
        value={newEmployee.phone_number}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, phone_number: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Contacto de Emergencia"
        value={newEmployee.emergency_contact}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            emergency_contact: e.target.value,
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
    </Box>

    {/* NSS y Estatus */}
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="NSS"
        value={newEmployee.nss ? "Sí" : "No"}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, nss: e.target.value === "Sí" })
        }
        select
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      >
        <MenuItem value="Sí">Sí</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>
    </Box>
    <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
      <TextField
        label="Estatus"
        value={newEmployee.status ? "Activo" : "Inactivo"}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            status: e.target.value === "Activo",
          })
        }
        select
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      >
        <MenuItem value="Activo">Activo</MenuItem>
        <MenuItem value="Inactivo">Inactivo</MenuItem>
      </TextField>
    </Box>
  </Box>
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