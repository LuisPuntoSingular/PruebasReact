import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export interface EmployeeContractsProps {
  employeeContractId: number;
}




const EmployeeContractsContent: React.FC<EmployeeContractsProps> = ({ employeeContractId}) => {
  // Fecha de inicio del primer contrato
  const initialStartDate = new Date("2025-05-01");

  // Generar dinámicamente las fechas de los contratos
  const contracts = Array.from({ length: 3 }, (_, index) => {
    const startDate = new Date(initialStartDate);
    startDate.setDate(startDate.getDate() + index * 30); // Cada contrato dura 29 días, el siguiente comienza al día 30
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 29); // Duración de 29 días
    return {
      name: `Contrato ${index + 1}`,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  });

  // Agregar el contrato de planta (indefinido)
  contracts.push({
    name: "Planta",
    startDate: new Date(contracts[contracts.length - 1].endDate).toISOString().split("T")[0],
    endDate: "Indefinido",
  });

  // Obtener la fecha actual
  const currentDate = new Date();

  // Estado para almacenar las fechas de firma, documentos subidos y nombres de archivos
  const [signedContracts, setSignedContracts] = useState<{ [key: number]: { signed: boolean; date?: string } }>({});
  const [uploadedDocuments, setUploadedDocuments] = useState<{ [key: number]: boolean }>({});
  const [uploadedFileNames, setUploadedFileNames] = useState<{ [key: number]: string }>({});

  // Manejar la firma del contrato
  const handleSignContract = (index: number) => {
    const today = new Date().toISOString().split("T")[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    setSignedContracts((prev) => ({
      ...prev,
      [index]: { signed: true, date: today }, // Marcar el contrato como firmado y registrar la fecha
    }));
  };

  // Manejar la subida del documento
  const handleUploadDocument = (index: number, file: File) => {
    setUploadedDocuments((prev) => ({
      ...prev,
      [index]: true, // Marcar el documento como subido
    }));
    setUploadedFileNames((prev) => ({
      ...prev,
      [index]: file.name, // Guardar el nombre del archivo subido
    }));
  };

  // Determinar el progreso actual basado en la fecha
  const activeStep = contracts.findIndex(
    (contract) => new Date(contract.startDate) > currentDate
  );

console.log('employeeContractId', employeeContractId)


  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF", // Fondo blanco
        color: "#1F2937", // Texto oscuro
        borderRadius: "12px",
        padding: "16px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra sutil
        margin: "0 auto",
      }}
    >
      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          color: "#1E3A8A", // Azul oscuro
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        Seguimiento de Contratos
      </Typography>

      {/* Stepper para mostrar el progreso de los contratos */}
      <Stepper
        activeStep={activeStep === -1 ? contracts.length : activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: "14px",
            fontWeight: "500",
            color: "#6B7280", // Gris para los pasos no activos
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#1E3A8A", // Azul oscuro para el paso activo
            fontWeight: "bold",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#1E3A8A", // Azul oscuro para el ícono activo
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#10B981", // Verde para los pasos completados
          },
        }}
      >
        {contracts.map((contract, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography
                variant="body2"
                sx={{
                  color:
                    new Date(contract.startDate) <= currentDate
                      ? "#10B981" // Verde si está habilitado
                      : "#9CA3AF", // Gris si no está habilitado
                  fontWeight: "500",
                }}
              >
                {contract.name}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Divider sx={{ margin: "16px 0" }} />

      {/* Lista de contratos */}
      <List>
        {contracts.map((contract, index) => {
          const isDue = new Date(contract.startDate) <= currentDate; // Verificar si la fecha ha llegado
          const isSigned = signedContracts[index]?.signed; // Verificar si ya está firmado
          const signedDate = signedContracts[index]?.date; // Obtener la fecha de firma
          const isUploaded = uploadedDocuments[index]; // Verificar si el documento está subido
          const uploadedFileName = uploadedFileNames[index]; // Obtener el nombre del archivo subido

          return (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "8px 0",
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "500",
                        color: isSigned ? "#10B981" : isDue ? "#1E3A8A" : "#6B7280", // Verde si firmado, azul si habilitado, gris si no
                      }}
                    >
                      {contract.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6B7280", // Gris para la fecha
                          fontStyle: "italic",
                        }}
                      >
                        Inicio: {contract.startDate} - Fin: {contract.endDate}
                      </Typography>
                      {isSigned && signedDate && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#10B981", // Verde para la fecha de firma
                            fontStyle: "italic",
                            display: "block",
                            marginTop: "4px",
                          }}
                        >
                          Firmado el: {signedDate}
                        </Typography>
                      )}
                      {uploadedFileName && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#1E3A8A", // Azul oscuro para el nombre del archivo
                            fontStyle: "italic",
                            display: "block",
                            marginTop: "4px",
                          }}
                        >
                          Documento: {uploadedFileName}
                        </Typography>
                      )}
                    </>
                  }
                />
                <ListItemSecondaryAction
                  sx={{
                    marginTop: "8px",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: "8px",
                  }}
                >
                  <IconButton
                    color={isUploaded ? "success" : "primary"}
                    component="label"
                    onClick={(e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleUploadDocument(index, file);
                    }}
                    disabled={!isDue || isSigned} // Deshabilitar si no es la fecha o ya está firmado
                  >
                    <UploadFileIcon />
                    <input type="file" hidden />
                  </IconButton>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSignContract(index)}
                    disabled={!isDue || isSigned || !isUploaded} // Deshabilitar si no es la fecha, ya está firmado o no se subió el documento
                    sx={{
                      backgroundColor: isSigned ? "#10B981" : "#1E3A8A", // Verde si firmado, azul si habilitado
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: isSigned ? "#0F9D68" : "#2563EB", // Tonos más oscuros al pasar el mouse
                      },
                      textTransform: "none",
                    }}
                  >
                    {isSigned ? "Firmado" : "Firmar"}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              {index < contracts.length - 1 && <Divider />} {/* Divisor entre contratos */}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default EmployeeContractsContent;