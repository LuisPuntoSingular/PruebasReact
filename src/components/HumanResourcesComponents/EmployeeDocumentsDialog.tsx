import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { getEmployeeDocuments, updateEmployeeDocuments, EmployeeDocuments } from "./employeeDocumentsApi";

interface Employee {
  id?: number;
  first_name: string;
}

interface EmployeeDocumentsDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

// Mapeo de nombres de documentos a español
const documentLabels: Record<keyof EmployeeDocuments, string> = {
  birth_certificate: "Acta de Nacimiento",
  curp: "CURP",
  proof_of_address: "Comprobante de Domicilio",
  ine: "INE",
  rfc: "RFC",
  nss: "NSS",
};

const EmployeeDocumentsDialog: React.FC<EmployeeDocumentsDialogProps> = ({
  open,
  onClose,
  employee,
}) => {
  const [documentChecklist, setDocumentChecklist] = useState<EmployeeDocuments>({
    birth_certificate: false,
    curp: false,
    proof_of_address: false,
    ine: false,
    rfc: false,
    nss: false,
  });

  const [loading, setLoading] = useState(false);

  // Fetch documents when the dialog opens
  useEffect(() => {
    if (employee && open) {
      const fetchDocuments = async () => {
        try {
          setLoading(true);
          const documents = await getEmployeeDocuments(employee.id);
          setDocumentChecklist(documents);
        } catch (error) {
          console.error("Error al obtener los documentos del empleado:", error);
  
          // Cambiar el tipo de error para evitar `any`
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 500) {
              alert("Ocurrió un error en el servidor. Intenta nuevamente más tarde.");
            } else if (error.response?.status === 404) {
              alert("No se encontraron documentos para este empleado.");
            } else {
              alert("No se pudieron cargar los documentos del empleado.");
            }
          } else {
            alert("Ocurrió un error inesperado.");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchDocuments();
    }
  }, [employee, open]);

  const handleChecklistChange = (field: keyof EmployeeDocuments) => {
    setDocumentChecklist((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    if (!employee) return;
  
    try {
      setLoading(true);
      await updateEmployeeDocuments(employee.id, documentChecklist);
      alert("Documentos actualizados correctamente.");
      onClose();
    } catch (error) {
      console.error("Error al actualizar los documentos del empleado:", error);
  
      // Cambiar el tipo de error para evitar `any`
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          alert("Ocurrió un error en el servidor al guardar los documentos.");
        } else {
          alert("No se pudieron guardar los documentos del empleado.");
        }
      } else {
        alert("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!employee) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1E293B",
          color: "#ffffff",
          borderRadius: "16px",
          padding: "16px",
          maxWidth: "500px",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1E3A8A",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "12px 12px 0 0",
          padding: "16px",
        }}
      >
        Documentos de {employee.first_name}
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : (
          Object.keys(documentChecklist).map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={documentChecklist[key as keyof EmployeeDocuments]}
                  onChange={() => handleChecklistChange(key as keyof EmployeeDocuments)}
                  sx={{ color: "#10B981" }}
                />
              }
              label={documentLabels[key as keyof EmployeeDocuments]} // Mostrar el nombre en español
            />
          ))
        )}
      </DialogContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
          gap: "8px",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#EF4444",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#DC2626" },
          }}
          disabled={loading}
        >
          Cerrar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#10B981",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#059669" },
          }}
          disabled={loading}
        >
          Guardar
        </Button>
      </Box>
    </Dialog>
  );
};

export default EmployeeDocumentsDialog;