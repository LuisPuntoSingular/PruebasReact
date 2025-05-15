import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Button, Box, Typography } from "@mui/material";
import { getEmployeeDocuments, updateEmployeeDocuments, EmployeeDocuments } from "../../Apis/employeeDocumentsApi";

interface EmployeeDocumentsDialogProps {
  employeeId: number;
}

// Mapeo de nombres de documentos a español
const documentLabels: Record<keyof EmployeeDocuments, string> = {
  birth_certificate: "Acta de Nacimiento",
  curp: "CURP",
  proof_of_address: "Comprobante de Domicilio",
  ine: "INE",
  rfc: "RFC",
  nss: "NSS",
  fonacot: "Fonacot", // Nuevo campo
  infonavit: "Infonavit", // Nuevo campo
};

const EmployeeDocumentsDialog: React.FC<EmployeeDocumentsDialogProps> = ({
  employeeId,
}) => {
  const [documentChecklist, setDocumentChecklist] = useState<EmployeeDocuments>({
    birth_certificate: false,
    curp: false,
    proof_of_address: false,
    ine: false,
    rfc: false,
    nss: false,
    fonacot: false, // Nuevo campo
    infonavit: false, // Nuevo campo
  });

  const [loading, setLoading] = useState(false);

  // Fetch documents when the component loads
  useEffect(() => {
    if (employeeId) {
      const fetchDocuments = async () => {
        try {
          setLoading(true);
          const documents = await getEmployeeDocuments(employeeId);
          setDocumentChecklist(documents);
        } catch (error) {
          console.error("Error al obtener los documentos del empleado:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDocuments();
    }
  }, [employeeId]);

  const handleChecklistChange = (field: keyof EmployeeDocuments) => {
    setDocumentChecklist((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    if (!employeeId) return;

    try {
      setLoading(true);
      await updateEmployeeDocuments(employeeId, documentChecklist);
      alert("Documentos actualizados correctamente.");
    } catch (error) {
      console.error("Error al actualizar los documentos del empleado:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!employeeId) return null;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        padding: "16px",
        backgroundColor: "#F9FAFB",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: "16px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#1F2937",
        }}
      >
        Documentos del Empleado
      </Typography>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // Permite que los elementos se ajusten en varias filas
            gap: "16px", // Espaciado entre los elementos
            justifyContent: "space-between", // Distribuye los elementos uniformemente
          }}
        >
          {Object.keys(documentChecklist).map((key) => (
            <Box
              key={key}
              sx={{
                flex: "1 1 calc(50% - 16px)", // Ocupa el 50% del ancho menos el espacio entre elementos
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={documentChecklist[key as keyof EmployeeDocuments]}
                    onChange={() => handleChecklistChange(key as keyof EmployeeDocuments)}
                  />
                }
                label={documentLabels[key as keyof EmployeeDocuments]}
              />
            </Box>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#4F46E5",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#4338CA" },
          }}
          disabled={loading}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeDocumentsDialog;