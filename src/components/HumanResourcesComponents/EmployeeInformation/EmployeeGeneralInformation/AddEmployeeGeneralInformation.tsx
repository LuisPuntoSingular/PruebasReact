import React, { useState, useEffect } from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import { getAllWorkAreas, WorkArea } from "../Apis/employeeWorkAreasApi";
import { getAllPlants } from "../Apis/employeePlantsApi"; // Importar la función para obtener las plantas

interface Employee {
  employee_id: number;
  first_name: string;
  second_name: string | null;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number | string;
  salary: number | string;
  hire_date: string;
  nss_date?: string | null;
  status: boolean;
  plant_id: number | string; // Agregar el campo plant_id
}

interface AddEmployeeGeneralInformationProps {
  newEmployee: Employee;
  setNewEmployee: React.Dispatch<React.SetStateAction<Employee>>;
}

const AddEmployeeGeneralInformation: React.FC<AddEmployeeGeneralInformationProps> = ({
  newEmployee,
  setNewEmployee,
}) => {
  const [workAreas, setWorkAreas] = useState<WorkArea[]>([]);
  const [plants, setPlants] = useState<{ id: number; plant_name: string }[]>([]); // Estado para las plantas

  useEffect(() => {
    // Obtener las áreas de trabajo
    const fetchWorkAreas = async () => {
      try {
        const areas = await getAllWorkAreas();
        setWorkAreas(areas);
      } catch (error) {
        console.error("Error al obtener las áreas de trabajo:", error);
      }
    };

    // Obtener las plantas
    const fetchPlants = async () => {
      try {
        const plantsData = await getAllPlants();
        setPlants(plantsData);
      } catch (error) {
        console.error("Error al obtener las plantas:", error);
      }
    };

    fetchWorkAreas();
    fetchPlants();
  }, []);

  // Función para formatear texto: primera letra en mayúscula, resto en minúsculas
  const formatText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };

  // Función para validar que solo se ingresen números
  const validateNumericInput = (text: string) => {
    return text.replace(/[^0-9]/g, ""); // Elimina cualquier carácter que no sea un número
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr", // Dos columnas de igual tamaño
        gap: "16px", // Espaciado entre los elementos
      }}
    >
      {/* Selección de Planta */}
      <TextField
        required
        label="Planta"
        value={newEmployee.plant_id || ""}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            plant_id: e.target.value, // Actualizar el plant_id en el estado
          })
        }
        select
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      >
        {plants.map((plant) => (
          <MenuItem key={plant.id} value={plant.id}>
            {plant.plant_name}
          </MenuItem>
        ))}
      </TextField>

      {/* Nombres y Apellidos */}
      <TextField
        required
        label="Primer Nombre"
        value={newEmployee.first_name}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            first_name: formatText(e.target.value),
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
      <TextField
        label="Segundo Nombre"
        value={newEmployee.second_name || ""}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            second_name: formatText(e.target.value),
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
      <TextField
        required
        label="Apellido Paterno"
        value={newEmployee.last_name_paterno}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            last_name_paterno: formatText(e.target.value),
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
      <TextField
        required
        label="Apellido Materno"
        value={newEmployee.last_name_materno}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            last_name_materno: formatText(e.target.value),
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />

      {/* Datos laborales */}
      <TextField
        required
        label="Puesto"
        value={newEmployee.work_area_id}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, work_area_id: e.target.value })
        }
        select
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      >
        {workAreas.map((area) => (
          <MenuItem key={area.id} value={area.id}>
            {area.work_area_name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        label="Salario"
        value={newEmployee.salary}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            salary: validateNumericInput(e.target.value), // Validar solo números
          })
        }
        fullWidth
        InputLabelProps={{
          style: { color: "#6B7280" },
        }}
      />
      <TextField
        required
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
      <TextField
        label="Fecha de alta de nss"
        type="date"
        value={newEmployee.nss_date || ""}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, nss_date: e.target.value })
        }
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { color: "#6B7280" },
        }}
      />
    </Box>
  );
};

export default AddEmployeeGeneralInformation;