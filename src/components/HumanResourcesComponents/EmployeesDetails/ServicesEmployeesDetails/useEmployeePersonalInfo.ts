import { useState, useEffect } from "react";
import { updateEmployeePersonalInformation, PersonalInfo } from "../../Apis/employeePersonalInformationApi";

export function useEmployeePersonalInfo(initialPersonalInfo: PersonalInfo | null) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(initialPersonalInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPersonalInfo(initialPersonalInfo);
  }, [initialPersonalInfo]);

  const updatePersonalInfo = async (updated: PersonalInfo) => {
    setLoading(true);
    setError(null);
    try {
      if (!updated.employee_id) throw new Error("El ID del empleado es requerido.");
      const result = await updateEmployeePersonalInformation(updated.employee_id, updated);
      setPersonalInfo(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar la información personal.");
        throw err;
      } else {
        setError("Error al actualizar la información personal.");
        throw new Error("Error al actualizar la información personal.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { personalInfo, setPersonalInfo, updatePersonalInfo, loading, error };
}