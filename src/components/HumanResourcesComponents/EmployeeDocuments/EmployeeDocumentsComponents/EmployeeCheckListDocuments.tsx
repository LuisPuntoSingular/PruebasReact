import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import DescriptionIcon from "@mui/icons-material/Description";
import { getEmployeeDocuments, updateEmployeeDocuments, EmployeeDocuments } from "../../Services/employeeDocumentsApi";

interface EmployeeDocumentsDialogProps {
  employeeId: number;
}

// Mapeo de nombres de documentos a español y sus íconos
const documentConfig: Record<
  keyof EmployeeDocuments,
  { label: string; icon: React.ReactNode; color: string }
> = {
  birth_certificate: {
    label: "Acta de Nacimiento",
    icon: <AssignmentIndIcon />,
    color: "#6366F1",
  },
  curp: {
    label: "CURP",
    icon: <BadgeIcon />,
    color: "#0EA5E9",
  },
  proof_of_address: {
    label: "Comprobante de Domicilio",
    icon: <HomeIcon />,
    color: "#F59E42",
  },
  ine: {
    label: "INE",
    icon: <CreditCardIcon />,
    color: "#10B981",
  },
  rfc: {
    label: "RFC",
    icon: <NumbersIcon />,
    color: "#F43F5E",
  },
  nss: {
    label: "NSS",
    icon: <AccountBalanceIcon />,
    color: "#A21CAF",
  },
  fonacot: {
    label: "Fonacot",
    icon: <SavingsIcon />,
    color: "#F59E42",
  },
  infonavit: {
    label: "Infonavit",
    icon: <DescriptionIcon />,
    color: "#2563EB",
  },
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
    fonacot: false,
    infonavit: false,
  });

  const [loading, setLoading] = useState(false);

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
        borderRadius: "12px",
        boxShadow: "0 2px 12px #1E293B11",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#1E293B",
          letterSpacing: 1,
        }}
      >
        Documentos del Empleado
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={1.2}
          useFlexGap
          sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        >
          {Object.entries(documentConfig).map(([key, { label, icon, color }]) => (
            <Box
              key={key}
              sx={{
                width: { xs: "100%", sm: "46%" },
                minWidth: 160,
                mb: 1,
                display: "flex",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  boxShadow: documentChecklist[key as keyof EmployeeDocuments]
                    ? "0 2px 8px #10B98122"
                    : "0 1px 4px #1E293B08",
                  borderColor: documentChecklist[key as keyof EmployeeDocuments]
                    ? "#10B981"
                    : "#E5E7EB",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  background: documentChecklist[key as keyof EmployeeDocuments]
                    ? "#ECFDF5"
                    : "#fff",
                  px: 1,
                  py: 0.5,
                  flex: 1,
                  minHeight: 44,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: color,
                    color: "#fff",
                    mr: 1,
                    width: 26,
                    height: 26,
                    fontSize: 16,
                  }}
                  variant="rounded"
                >
                  {icon}
                </Avatar>
                <CardContent sx={{ flex: 1, p: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "#22223B",
                      fontSize: "0.93rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {label}
                  </Typography>
                </CardContent>
                <Checkbox
                  checked={documentChecklist[key as keyof EmployeeDocuments]}
                  onChange={() => handleChecklistChange(key as keyof EmployeeDocuments)}
                  sx={{
                    color: "#7C3AED",
                    "&.Mui-checked": { color: "#10B981" },
                    p: 0.5,
                  }}
                />
              </Card>
            </Box>
          ))}
        </Stack>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "18px",
        }}
      >
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#7C3AED",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "uppercase",
            boxShadow: "0 2px 8px #7C3AED22",
            "&:hover": { backgroundColor: "#5B21B6" },
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