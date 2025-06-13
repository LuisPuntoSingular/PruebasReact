import axios from "axios";
import {
  EmployeeVacationBalance,
  VacationRequest,
  VacationRequestStatus,
} from "../types/vacationTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Balance de vacaciones
export const getVacationBalance = async (employeeId: number): Promise<EmployeeVacationBalance[]> => {
  const { data } = await axios.get(
    `${API_BASE_URL}/api/employeeVacations/employee/${employeeId}`,
    { withCredentials: true }
  );
  return data;
};

// Solicitudes de vacaciones
export const getVacationRequests = async (employeeId: number): Promise<VacationRequest[]> => {
  const { data } = await axios.get(
    `${API_BASE_URL}/api/employeeVacationRequest/employee/${employeeId}`,
    { withCredentials: true }
  );
  return data;
};

export const createVacationRequest = async (
  employeeId: number,
  days: { date: string; is_half_day?: boolean }[]
) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/api/employeeVacationRequest`,
    {
      employee_id: employeeId,
      days,
    },
    { withCredentials: true }
  );
  return data;
};

export const updateVacationRequestStatus = async (
  requestId: number,
  status: VacationRequestStatus,
  decisionBy: number
) => {
  const { data } = await axios.patch(
    `${API_BASE_URL}/api/employeeVacationRequest/${requestId}/status`,
    {
      status,
      decision_by: decisionBy,
    },
    { withCredentials: true }
  );
  return data;
};


export const refreshVacationBalance = async () => {
  const { data } = await axios.post(
    `${API_BASE_URL}/api/employeeVacations/actualizar-vacaciones`,
    {},
    { withCredentials: true }
  );
  return data;
};