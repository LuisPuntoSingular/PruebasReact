import React from "react";
import {
  Dialog,

  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployeeContractsContent from "./EmployeeDocumentsComponents/EmployeeContractsDocuments";
import EmployeeVacationsContent from "./EmployeeDocumentsComponents/EmployeeVacations/EmployeeVacationsDocuments";
import EmployeeCheckListDocuments from "./EmployeeDocumentsComponents/EmployeeCheckListDocuments";

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
          backgroundColor: "#F4F6F8",
          color: "#22223B",
          borderRadius: "14px",
          padding: 0,
          maxWidth: "650px",
          width: "100%",
          boxShadow: "0 8px 32px 0 #1E293B22",
        },
      }}
    >
      
      <DialogContent
        dividers
        sx={{
          padding: "32px 32px 16px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          background: "#F4F6F8",
        }}
      >
        {/* Menú de Contratos */}
        <Accordion
          sx={{
            background: "#F8FAFC",
            borderRadius: "8px",
            boxShadow: "0 1px 4px #1E293B08",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#3B82F6" }} />}
            sx={{
              backgroundColor: "#E3F2FD",
              borderRadius: "8px 8px 0 0",
              minHeight: 48,
              "& .MuiAccordionSummary-content": { margin: 0 },
            }}
          >
            <Typography variant="h6" sx={{ color: "#2563EB", fontWeight: 600, fontSize: "1.08rem" }}>
              Contratos
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ background: "#F8FAFC", borderRadius: "0 0 8px 8px" }}>
            <EmployeeContractsContent employeeContractId={employeeId} />
          </AccordionDetails>
        </Accordion>

        {/* Menú de Vacaciones */}
        <Accordion
          sx={{
            background: "#F8FAFC",
            borderRadius: "8px",
            boxShadow: "0 1px 4px #1E293B08",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#F59E0B" }} />}
            sx={{
              backgroundColor: "#FFF7E6",
              borderRadius: "8px 8px 0 0",
              minHeight: 48,
              "& .MuiAccordionSummary-content": { margin: 0 },
            }}
          >
            <Typography variant="h6" sx={{ color: "#B45309", fontWeight: 600, fontSize: "1.08rem" }}>
              Vacaciones
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ background: "#F8FAFC", borderRadius: "0 0 8px 8px" }}>
            <EmployeeVacationsContent
             employeeId={employeeId}
             decisionById={1} />
          </AccordionDetails>
        </Accordion>

        {/* Menú de Documentos */}
        <Accordion
          sx={{
            background: "#F8FAFC",
            borderRadius: "8px",
            boxShadow: "0 1px 4px #1E293B08",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#10B981" }} />}
            sx={{
              backgroundColor: "#E6F7E6",
              borderRadius: "8px 8px 0 0",
              minHeight: 48,
              "& .MuiAccordionSummary-content": { margin: 0 },
            }}
          >
            <Typography variant="h6" sx={{ color: "#059669", fontWeight: 600, fontSize: "1.08rem" }}>
              Documentos
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ background: "#F8FAFC", borderRadius: "0 0 8px 8px" }}>
            <EmployeeCheckListDocuments employeeId={employeeId} />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <Divider sx={{ my: 0 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "18px 32px",
          gap: "8px",
          background: "#F4F6F8",
          borderRadius: "0 0 14px 14px",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#22223B",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 2,
            px: 4,
            py: 1.2,
            textTransform: "none",
            boxShadow: "0 2px 8px #22223B22",
            "&:hover": { backgroundColor: "#1E293B" },
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};

export default EmployeeContractsVacationsDialog;