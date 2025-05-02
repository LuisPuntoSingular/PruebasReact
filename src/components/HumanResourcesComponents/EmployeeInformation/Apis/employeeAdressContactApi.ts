import axios from "axios";

const API_URL = "https://backnode-production.up.railway.app"; // Cambia la URL si es necesario

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

// Definir la interfaz para la dirección y contacto
export interface AddressContact {
  employee_id: number;
  postal_code: string;
  neighborhood: string;
  state: string;
  municipality: string;
  street_and_number: string;
  phone_number: string;
  email?: string;
}

// Obtener dirección y contacto por ID
export const getEmployeeAddressById = async (id: number): Promise<AddressContact> => {
  try {
    const response = await apiClient.get<AddressContact>(`/api/employeeAddressContact/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la dirección y contacto con ID ${id}:`, error);
    throw new Error("No se pudo obtener la dirección y contacto.");
  }
};

// Crear nueva dirección y contacto
export const createEmployeeAddress = async (addressInfo: AddressContact): Promise<AddressContact> => {
  try {
    const response = await apiClient.post<AddressContact>("/api/employeeAddressContact", addressInfo);
    return response.data;
  } catch (error) {
    console.error("Error al crear la dirección y contacto:", error);
    throw new Error("No se pudo crear la dirección y contacto.");
  }
};

// Actualizar dirección y contacto por ID
export const updateEmployeeAddress = async (
  id: number,
  addressInfo: AddressContact
): Promise<AddressContact> => {
  try {
    const response = await apiClient.put<AddressContact>(`/api/employeeAddressContact/${id}`, addressInfo);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la dirección y contacto con ID ${id}:`, error);
    throw new Error("No se pudo actualizar la dirección y contacto.");
  }
};

// Eliminar dirección y contacto por ID
export const deleteEmployeeAddress = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/api/employeeAddressContact/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la dirección y contacto con ID ${id}:`, error);
    throw new Error("No se pudo eliminar la dirección y contacto.");
  }
};