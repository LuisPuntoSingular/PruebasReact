import { useState, useEffect } from "react";
import { updateEmployee, Employee } from "../../Apis/employeeApi";

export function useEmployeeGeneralInfo(initialEmployee: Employee | null) {
  const [employee, setEmployee] = useState<Employee | null>(initialEmployee);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmployee(initialEmployee);
  }, [initialEmployee]);

  const updateGeneralInfo = async (updated: Employee) => {
    setLoading(true);
    setError(null);
    try {
      if (!updated.id) throw new Error("El ID del empleado es requerido.");
      const result = await updateEmployee(updated.id, updated);
      setEmployee(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar la información general.");
        throw err;
      } else {
        setError("Error al actualizar la información general.");
        throw new Error("Error al actualizar la información general.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { employee, setEmployee, updateGeneralInfo, loading, error };
}