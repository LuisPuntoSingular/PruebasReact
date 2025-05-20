import { useState, useEffect } from "react";
import { updateEmployeeAddress, AddressContact } from "../../Apis/employeeAdressContactApi";

export function useEmployeeAddress(initialAddress: AddressContact | null) {
  const [address, setAddress] = useState<AddressContact | null>(initialAddress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Actualiza el estado interno cuando cambia initialAddress
  useEffect(() => {
    setAddress(initialAddress);
  }, [initialAddress]);

  const updateAddress = async (updated: AddressContact) => {
    setLoading(true);
    setError(null);

    try {
      const result = await updateEmployeeAddress(updated.employee_id, updated);
      setAddress(result);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar la dirección.");
        throw err;
      } else {
        setError("Error al actualizar la dirección.");
        throw new Error("Error al actualizar la dirección.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { address, setAddress, updateAddress, loading, error };
}