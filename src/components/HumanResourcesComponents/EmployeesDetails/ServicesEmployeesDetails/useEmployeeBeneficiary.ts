import { useState, useEffect } from "react";
import { updateEmployeeBeneficiary, Beneficiary } from "../../Apis/employeeBeneficiaryApi";

export function useEmployeeBeneficiary(initialBeneficiary: Beneficiary | null) {
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(initialBeneficiary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBeneficiary(initialBeneficiary);
  }, [initialBeneficiary]);

  const updateBeneficiary = async (updated: Beneficiary) => {
    setLoading(true);
    setError(null);
    try {
      if (!("employee_id" in updated) || !updated.employee_id) {
        throw new Error("employee_id es requerido para actualizar el beneficiario.");
      }
      const result = await updateEmployeeBeneficiary(updated.employee_id, updated);
      setBeneficiary(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar el beneficiario.");
        throw err;
      } else {
        setError("Error al actualizar el beneficiario.");
        throw new Error("Error al actualizar el beneficiario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { beneficiary, setBeneficiary, updateBeneficiary, loading, error };
}