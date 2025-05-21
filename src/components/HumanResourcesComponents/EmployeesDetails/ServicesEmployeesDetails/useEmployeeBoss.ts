import { useState, useEffect } from "react";
import {

  updateEmployeeSupervisor,
 
  EmployeeSupervisor,
} from "../../Apis/employeeBossApi";

export function useEmployeeBoss(initialBoss: EmployeeSupervisor | null) {
  const [boss, setBoss] = useState<EmployeeSupervisor | null>(initialBoss);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBoss(initialBoss);
  }, [initialBoss]);

  const updateBoss = async (updated: EmployeeSupervisor) => {
    setLoading(true);
    setError(null);
    try {
      if (!updated.id) throw new Error("El ID del registro de jefe es requerido.");
      const result = await updateEmployeeSupervisor(updated.id, {
        employee_id: updated.employee_id,
        supervisor_id: updated.supervisor_id,
        start_date: updated.start_date,
        end_date: updated.end_date,
        active: updated.active,
      });
      setBoss(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar el jefe.");
        throw err;
      } else {
        setError("Error al actualizar el jefe.");
        throw new Error("Error al actualizar el jefe.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { boss, setBoss, updateBoss, loading, error };
}