import axios from "axios";

// Usar la variable de entorno para configurar la URL base
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employeeAddressContact`;

// Configurar el cliente Axios
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});



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
    const response = await apiClient.get<AddressContact>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la dirección y contacto con ID ${id}:`, error);
    throw new Error("No se pudo obtener la dirección y contacto.");
  }
};

// Crear nueva dirección y contacto
export const createEmployeeAddress = async (addressInfo: AddressContact): Promise<AddressContact> => {
  try {
    const response = await apiClient.post<AddressContact>("/", addressInfo);
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
    const response = await apiClient.put<AddressContact>(`/${id}`, addressInfo);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la dirección y contacto con ID ${id}:`, error);
    throw new Error("No se pudo actualizar la dirección y contacto.");
  }
};

// Eliminar dirección y contacto por ID
export const deleteEmployeeAddress = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la dirección y contacto con ID ${id}:`, error);
    throw new Error("No se pudo eliminar la dirección y contacto.");
  }
};