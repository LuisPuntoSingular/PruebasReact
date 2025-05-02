import axios, { AxiosResponse } from "axios";

const API_URL = "https://backnode-production.up.railway.app"; // Cambia la URL si es necesario

// Definir la interfaz para un empleado
export interface Employee {
  id?: number; // Opcional porque no estará presente al crear un nuevo empleado
  plant_id?: number; // Opcional porque no estará presente al crear un nuevo empleado
  first_name: string;
  second_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number;
  salary: number;
  hire_date: string;
  phone_number?: string; // Opcional
  emergency_contact?: string; // Opcional
  nss_date?: string | null; // Opcional, puede ser null
  status: boolean;
}

// Configurar el cliente Axios con un interceptor
const apiClient = axios.create({
  baseURL: API_URL,
  
});

// Agregar el token de autenticación a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Obtén el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





// Obtener todos los empleados
export const getEmployees = async (): Promise<Employee[]> => {
  const response: AxiosResponse<Employee[]> = await apiClient.get("/api/employee/");
  return response.data;
};


// Obtener un empleado por ID
export const getEmployeeById = async (id: number): Promise<Employee> => {
  try {
    const response: AxiosResponse<Employee> = await apiClient.get(`/api/employee/${id}`);
    return response.data; // Devuelve la información del empleado
  } catch (error) {
    console.error("Error retrieving employee by ID:", error);
    throw error;
  }
};



// Crear un nuevo empleado
export const createEmployee = async (employee: Employee): Promise<Employee> => {
    console.log("Datos enviados al backend:", employee); // Agregar console.log para depuración
    const response: AxiosResponse<Employee> = await apiClient.post("/api/employee/", employee);
    return response.data;
  };
// Actualizar un empleado
export const updateEmployee = async (id: number, employee: Employee): Promise<Employee> => {
  const response: AxiosResponse<Employee> = await apiClient.put(`/api/employee/${id}`, employee);
  return response.data;
};

// Eliminar un empleado
export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};


