import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import StatCard from "../components/HumanResourcesComponents/StatCard";
import EmployeeTable from "../components/HumanResourcesComponents/EmployeeTable";
import AddEmployeeDialog from "../components/HumanResourcesComponents/EmployeeInformation/AddEmployeeDialog";
import EmployeeDetailsDialog from "../components/HumanResourcesComponents/EmployeeDetailsDialog";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getEmployees } from "../components/HumanResourcesComponents/Apis/employeeApi";
import RefreshIcon from "@mui/icons-material/Refresh"; // Importar el ícono de refrescar


interface Employee {
  
  id?: number; // Opcional si no está presente al crear un nuevo empleado
  first_name: string;
  second_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number | string; // Cambiado a string para que coincida con el tipo de work_area_id en el formulario
  salary: number | string; // Cambiado a string para que coincida con el tipo de salary en el formulario
  hire_date: string;
  nss_date?: string | null; // Opcional si no está presente al crear un nuevo empleado

  status: boolean;
}


const HumanResources: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(0); // Estado para la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para las filas por página
  
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Cambiar `any` a `Employee | null`
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Cargar empleados desde la API al inicio
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

   

    fetchEmployees();
   
  }, []);

  // Manejar la creación de un nuevo empleado
 

  

  // Función para cargar empleados desde la API
  const refreshEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  // Cargar empleados al inicio
  useEffect(() => {
    refreshEmployees();
  }, []);


 // Manejar el cambio de página
 const handlePageChange = (event: unknown, newPage: number) => {
  setPage(newPage);
};

// Manejar el cambio de filas por página
const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0); // Reiniciar a la primera página
};






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
        value={0}
        backgroundColor="#F59E0B"
        sx={{
          flex: "1 1 calc(33.333% - 8px)",
          minWidth: "100px",
          padding: "8px",
        }}
      />
    </Box>

    {/* Botones de refrescar y agregar empleado */}
    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "16px 0", gap: "8px" }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={refreshEmployees} // Llama a la función para refrescar empleados
        sx={{
          minWidth: "40px",
          padding: "8px",
          borderRadius: "50%",
          borderColor: "#3B82F6",
          color: "#3B82F6",
          "&:hover": { backgroundColor: "#E0F2FE", borderColor: "#2563EB" },
        }}
      >
        <RefreshIcon />
      </Button>
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
  filteredEmployees={employees} // <-- Pasa la lista completa
  page={page}
  rowsPerPage={rowsPerPage}
  onPageChange={handlePageChange}
  onRowsPerPageChange={handleRowsPerPageChange}
  onEmployeeSelect={(employee) => setSelectedEmployee(employee)}
/>

    {/* Diálogo para agregar empleado */}
    <AddEmployeeDialog
      open={openAddDialog}
      onClose={() => setOpenAddDialog(false)}
      
    />

    {/* Diálogo para mostrar detalles del empleado */}
    <EmployeeDetailsDialog
      open={!!selectedEmployee}
      onClose={() => setSelectedEmployee(null)}
      employeeId={selectedEmployee ? selectedEmployee.id : null}
    />
  </Box>
);
};

export default HumanResources;