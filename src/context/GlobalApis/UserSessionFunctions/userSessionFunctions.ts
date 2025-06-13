import { getEmployeeById,Employee} from "../../../components/HumanResourcesComponents/Services/employeeApi";

// Función para obtener los datos del empleado por ID
export const fetchEmployee = async (employeeId: number): Promise<Employee> => {
  try {
    const employee = await getEmployeeById(employeeId); // Llama a la API con el ID del empleado
    console.log("Empleado:", employee);
    return employee;
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    throw error;
  }
};


