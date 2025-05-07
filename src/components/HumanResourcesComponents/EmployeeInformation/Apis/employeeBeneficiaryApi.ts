import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeeBeneficiary`;

// Configurar el cliente Axios
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

// Definir la interfaz para el beneficiario
export interface Beneficiary {
  employee_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  relationship: string;
  phone_number: string;
  percentage: number;
}

// Obtener un beneficiario por ID
export const getEmployeeBeneficiaryById = async (id: number): Promise<Beneficiary> => {
  try {
    const response = await apiClient.get<Beneficiary>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el beneficiario con ID ${id}:`, error);
    throw new Error("No se pudo obtener el beneficiario.");
  }
};

// Crear un nuevo beneficiario
export const createEmployeeBeneficiary = async (beneficiaryInfo: Beneficiary): Promise<Beneficiary> => {
  try {
    const response = await apiClient.post<Beneficiary>("/", beneficiaryInfo);
    return response.data;
  } catch (error) {
    console.error("Error al crear el beneficiario:", error);
    throw new Error("No se pudo crear el beneficiario.");
  }
};

// Actualizar un beneficiario por ID
export const updateEmployeeBeneficiary = async (
  id: number,
  beneficiaryInfo: Beneficiary
): Promise<Beneficiary> => {
  try {
    const response = await apiClient.put<Beneficiary>(`/${id}`, beneficiaryInfo);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el beneficiario con ID ${id}:`, error);
    throw new Error("No se pudo actualizar el beneficiario.");
  }
};

// Eliminar un beneficiario por ID
export const deleteEmployeeBeneficiary = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el beneficiario con ID ${id}:`, error);
    throw new Error("No se pudo eliminar el beneficiario.");
  }
};