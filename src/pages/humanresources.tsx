import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import StatCard from "../components/HumanResourcesComponents/StatCard";
import EmployeeTable from "../components/HumanResourcesComponents/EmployeeTable";
import AddEmployeeDialog from "../components/HumanResourcesComponents/AddEmployeeDialog";
import EmployeeDetailsDialog from "../components/HumanResourcesComponents/EmployeeDetailsDialog";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getEmployees, createEmployee } from "../components/HumanResourcesComponents/employeeApi";
import { getNssCount } from "../components/HumanResourcesComponents/employeeApi";

interface Employee {
  
  id?: number; // Opcional si no está presente al crear un nuevo empleado
 
  name: string;
  last_name_paterno: string;
  last_name_materno: string;
  position: string;
  salary: number;
  hire_date: string;
  phone_number?: string;
  emergency_contact?: string;

  status: boolean;
}


const HumanResources: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [nssCount, setNssCount] = useState<number>(0); // Estado para el contador de NSS
  
  const [newEmployee, setNewEmployee] = useState<Employee>({
    
    name: "",
    last_name_paterno: "",
    last_name_materno: "",
    position: "",
    salary: 0,
    hire_date: "",
    phone_number: "",
    emergency_contact: "",
    status: true,
  });
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Cambiar `any` a `Employee | null`
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Cargar empleados desde la API al inicio
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    const fetchNssCount = async () => {
      try {
        const count = await getNssCount();
        setNssCount(count); // Actualizar el estado con el contador de NSS
      } catch (error) {
        console.error("Error al obtener el contador de NSS:", error);
      }
    };

    fetchEmployees();
    fetchNssCount();
  }, []);

  // Manejar la creación de un nuevo empleado
  const handleAddEmployee = async () => {
    const addedEmployee = await createEmployee({ ...newEmployee, salary: newEmployee.salary });
    setEmployees([...employees, addedEmployee]); // Actualizar la lista de empleados
    setOpenAddDialog(false);
    setNewEmployee({
      // Reiniciar el formulario

     
      name: "",
      last_name_paterno: "",
      last_name_materno: "",
      position: "",
      salary: 0,
      hire_date: "",
      phone_number: "",
      emergency_contact: "",
 
      status: true,
    });
  };

  

  // Función para cargar empleados desde la API
  const refreshEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  // Cargar empleados al inicio
  useEffect(() => {
    refreshEmployees();
  }, []);

  return (
    <Box>
      {/* Sección de estadísticas */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "space-between",
        }}
      >
        <StatCard
          icon={<PeopleIcon sx={{ fontSize: "20px" }} />}
          title="Empleados"
          value={employees.length}
          backgroundColor="#3B82F6"
          sx={{
            flex: "1 1 calc(33.333% - 8px)",
            minWidth: "100px",
            padding: "8px",
          }}
        />
        <StatCard
          icon={<CheckCircleIcon sx={{ fontSize: "20px" }} />}
          title="Activos"
          value={employees.filter((e) => e.status).length}
          backgroundColor="#10B981"
          sx={{
            flex: "1 1 calc(33.333% - 8px)",
            minWidth: "100px",
            padding: "8px",
          }}
        />
        <StatCard
          icon={<VerifiedIcon sx={{ fontSize: "20px" }} />}
          title="NSS Activo"
          value={nssCount}
          backgroundColor="#F59E0B"
          sx={{
            flex: "1 1 calc(33.333% - 8px)",
            minWidth: "100px",
            padding: "8px",
          }}
        />
      </Box>

      {/* Botón para agregar empleado */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "16px 0" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddDialog(true)}
          sx={{
            backgroundColor: "#3B82F6",
            color: "#ffffff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#2563EB" },
          }}
        >
          Agregar Empleado
        </Button>
      </Box>

      {/* Tabla de empleados */}
      <EmployeeTable
        
        filteredEmployees={employees}
        page={0}
        rowsPerPage={5}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        onEmployeeSelect={(employee) => setSelectedEmployee(employee)}
      />

      {/* Diálogo para agregar empleado */}
      <AddEmployeeDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        refreshEmployees={refreshEmployees} // Pasa la función para recargar empleados
        newEmployee={{ ...newEmployee, salary: newEmployee.salary }}
        setNewEmployee={setNewEmployee}
        onSave={handleAddEmployee} // Pasa la función para guardar
      />

      {/* Diálogo para mostrar detalles del empleado */}
      <EmployeeDetailsDialog
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        employee={
          selectedEmployee
            ? {
                name: selectedEmployee.name,
                lastNamePaterno: selectedEmployee.last_name_paterno,
                lastNameMaterno: selectedEmployee.last_name_materno,
                phoneNumber: selectedEmployee.phone_number,
                emergencyContact: selectedEmployee.emergency_contact,
                hireDate: selectedEmployee.hire_date,
              
              }
            : null
        }
      />
    </Box>
  );
};

export default HumanResources;