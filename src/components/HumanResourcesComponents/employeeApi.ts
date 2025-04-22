import axios, { AxiosResponse } from "axios";

const API_URL = "https://backnode-production.up.railway.app/api/employee"; // Cambia la URL si es necesario

// Definir la interfaz para un empleado
export interface Employee {
  id?: number; // Opcional porque no estará presente al crear un nuevo empleado
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
  const response: AxiosResponse<Employee[]> = await apiClient.get("/");
  return response.data;
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

// Eliminar un empleado
export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};