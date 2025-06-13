import { useState, useEffect } from "react";
import {
  getVacationBalance,
  getVacationRequests,
  createVacationRequest,
  updateVacationRequestStatus,
  refreshVacationBalance,
} from "../services/vacationService";
import {
  EmployeeVacationBalance,
  VacationRequest,
  VacationRequestStatus,
} from "../types/vacationTypes";

export const useEmployeeVacations = (employeeId: number) => {
  const [balance, setBalance] = useState<EmployeeVacationBalance[]>([]);
  const [requests, setRequests] = useState<VacationRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const [bal, reqs] = await Promise.all([
      getVacationBalance(employeeId),
      getVacationRequests(employeeId),
    ]);
    setBalance(bal);
    setRequests(reqs);
    setLoading(false);
  };

  useEffect(() => {
    if (employeeId) fetchAll();
    // eslint-disable-next-line
  }, [employeeId]);

  const submitRequest = async (days: { date: string; is_half_day?: boolean }[]) => {
    await createVacationRequest(employeeId, days);
    await fetchAll();
  };
    const reloadBalance = async () => {
    await refreshVacationBalance();
    await fetchAll();
  };

  const changeRequestStatus = async (
    requestId: number,
    status: VacationRequestStatus,
    decisionBy: number
  ) => {
    await updateVacationRequestStatus(requestId, status, decisionBy);
    await fetchAll();
  };

  return {
    balance,
    requests,
    loading,
    submitRequest,
    changeRequestStatus,
    refresh: fetchAll,
    reloadBalance,
  };
};