import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployeeContractsContent from "./EmployeeDocumentsComponents/EmployeeContractsDocuments"; // Importa el componente
import EmployeeVacationsContent from "./EmployeeDocumentsComponents/EmployeeVacationsDocuments"; // Importa el componente
import EmployeeCheckListDocuments from "./EmployeeDocumentsComponents/EmployeeCheckListDocuments"; // Importa el componente

interface EmployeeContractsVacationsDialogProps {
  open: boolean;
  onClose: () => void;
  employeeId: number;
 
}

const EmployeeContractsVacationsDialog: React.FC<EmployeeContractsVacationsDialogProps> = ({
  open,
  onClose,
  employeeId,

}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#F9FAFB", // Fondo claro
          color: "#1F2937", // Texto oscuro
          borderRadius: "12px",
          padding: "16px",
          maxWidth: "600px", // Ancho máximo ajustado
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1E3A8A", // Fondo azul oscuro
          color: "#ffffff", // Texto blanco
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "12px 12px 0 0",
          padding: "16px",
        }}
      >
        Contratos, Vacaciones y Documentos
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
        {/* Menú de Contratos */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
            <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
              Contratos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmployeeContractsContent employeeContractId={employeeId} />
          </AccordionDetails>
        </Accordion>

        {/* Menú de Vacaciones */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#FFF7E6" }}>
            <Typography variant="h6" sx={{ color: "#F59E0B", fontWeight: "bold" }}>
              Vacaciones
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmployeeVacationsContent />
          </AccordionDetails>
        </Accordion>

        {/* Menú de Documentos */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E6F7E6" }}>
            <Typography variant="h6" sx={{ color: "#10B981", fontWeight: "bold" }}>
              Documentos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmployeeCheckListDocuments
            
              employeeId={employeeId}
            />
          </AccordionDetails>
        </Accordion>
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
            textTransform: "none",
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};

export default EmployeeContractsVacationsDialog;