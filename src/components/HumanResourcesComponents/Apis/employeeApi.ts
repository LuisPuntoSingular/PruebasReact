import axios, { AxiosResponse } from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee`;

// Definir la interfaz para un empleado
export interface Employee {
  id?: number; // Opcional porque no estará presente al crear un nuevo empleado
  plant_id?: number; // Opcional porque no estará presente al crear un nuevo empleado
  first_name: string;
  second_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number | string; // Cambiado a string para que coincida con el tipo de work_area_id en el formulario
  salary: number | string; // Cambiado a string para que coincida con el tipo de salary en el formulario
  hire_date: string;
  phone_number?: string; // Opcional
  emergency_contact?: string; // Opcional
  nss_date?: string | null; // Opcional, puede ser null
  status: boolean;
  is_boss?: boolean;
}

export interface Boss {
  id: number;
  full_name: string; // Ahora solo necesitas el campo full_name
}
// Configurar el cliente Axios con un interceptor
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


// Obtener todos los empleados
export const getEmployees = async (): Promise<Employee[]> => {
  const response: AxiosResponse<Employee[]> = await apiClient.get("/");
  return response.data;
};

// Obtener un empleado por ID
export const getEmployeeById = async (id: number): Promise<Employee> => {
  try {
    const response: AxiosResponse<Employee> = await apiClient.get(`/${id}`);
    return response.data; // Devuelve la información del empleado
  } catch (error) {
    console.error("Error retrieving employee by ID:", error);
    throw error;
  }
};

// Crear un nuevo empleado
export const createEmployee = async (employee: Employee): Promise<Employee> => {
  console.log("Datos enviados al backend:", employee); // Agregar console.log para depuración
  const response: AxiosResponse<Employee> = await apiClient.post("/", employee);
  return response.data;
};

// Actualizar un empleado
export const updateEmployee = async (id: number, employee: Employee): Promise<Employee> => {
  const response: AxiosResponse<Employee> = await apiClient.put(`/${id}`, employee);
  return response.data;
};

// Actualizar parcialmente un empleado
export const patchEmployee = async (id: number, updates: Partial<Employee>): Promise<Employee> => {
  try {
    const response: AxiosResponse<Employee> = await apiClient.patch(`/${id}`, updates);
    return response.data; // Devuelve la información actualizada del empleado
  } catch (error) {
    console.error("Error en PATCH /:id:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Eliminar un empleado
export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};

// Obtener el ID y nombre completo de todos los empleados que son jefes
export const fetchBosses = async (): Promise<Boss[]> => {
  const response = await apiClient.get("/bosses"); // Ajusta la URL según tu API
  const data = response.data;

  // Devuelve los datos directamente, ya que el campo `full_name` ya está presente
  return data.map((boss: Boss) => ({
    id: boss.id,
    full_name: boss.full_name, // Usa directamente el campo `full_name` de la API
  }));
};

export const getEmployeePlantId = async (id: number): Promise<{ plant_id: number }> => {
  try {
    const response: AxiosResponse<{ plant_id: number }> = await apiClient.get(`/plant/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving employee plant_id:", error);
    throw error;
  }
};
