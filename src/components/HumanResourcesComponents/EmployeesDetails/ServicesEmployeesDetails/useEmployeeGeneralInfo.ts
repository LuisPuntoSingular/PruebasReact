import { useState, useEffect } from "react";
import { patchEmployee, Employee } from "../../Services/employeeApi";

export function useEmployeeGeneralInfo(initialEmployee: Employee | null) {
  const [employee, setEmployee] = useState<Employee | null>(initialEmployee);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmployee(initialEmployee);
  }, [initialEmployee]);

  const updateGeneralInfo = async (updated: Partial<Employee>) => {
    setLoading(true);
    setError(null);
    try {
      if (!updated.id) throw new Error("El ID del empleado es requerido.");
      const result = await patchEmployee(updated.id, updated);
      setEmployee((prev) => ({ ...prev, ...result })); // Actualizar solo los campos modificados
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