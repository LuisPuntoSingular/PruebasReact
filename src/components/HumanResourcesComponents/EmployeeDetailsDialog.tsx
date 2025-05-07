import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getEmployeeById } from "../HumanResourcesComponents/EmployeeInformation/Apis/employeeApi";
import { getEmployeePersonalInformationById } from "../HumanResourcesComponents/EmployeeInformation/Apis/employeePersonalInformationApi";
import { getEmployeeBeneficiaryById } from "../HumanResourcesComponents/EmployeeInformation/Apis/employeeBeneficiaryApi";
import { getEmployeeAddressById } from "../HumanResourcesComponents/EmployeeInformation/Apis/employeeAdressContactApi";

interface EmployeeDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  employeeId: number;
}

interface Employee {
  id?: number;
  first_name: string;
  second_name: string | null;
  last_name_paterno: string;
  last_name_materno: string;
  work_area_id: number | string;
  salary: number | string;
  hire_date: string;
  nss_date?: string | null;
  status: boolean;
  plant_id?: number | string; // Agregar el campo plant_id
}

// Información personal del empleado
interface PersonalInfo {
  curp?: string;
  rfc?: string;
  gender: string;
  marital_status: string;
  birth_date: string;
  nss?: string;
}

// Dirección y contacto del empleado
interface AddressContact {
  postal_code: string;
  neighborhood: string;
  state: string;
  municipality: string;
  street_and_number: string;
  phone_number: string;
  email?: string;
}

// Beneficiario del empleado
interface Beneficiary {
  first_name: string;
  last_name: string;
  birth_date: string;
  relationship: string;
  phone_number: string;
  percentage: number;
}

const EmployeeDetailsDialog: React.FC<EmployeeDetailsDialogProps> = ({ open, onClose, employeeId }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [addressContact, setAddressContact] = useState<AddressContact | null>(null);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null); // Información general del empleado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      const fetchEmployeeDetails = async () => {
        setLoading(true);
        try {
          const personalData: PersonalInfo = await getEmployeePersonalInformationById(employeeId);
          const addressData: AddressContact = await getEmployeeAddressById(employeeId);
          const beneficiaryData: Beneficiary = await getEmployeeBeneficiaryById(employeeId);
          const generalData: Employee = await getEmployeeById(employeeId); // Obtener información general del empleado

          setPersonalInfo(personalData);
          setAddressContact(addressData);
          setBeneficiary(beneficiaryData);
          setEmployeeInfo(generalData); // Guardar la información general
        } catch (error) {
          console.error("Error al obtener los detalles del empleado:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeDetails();
    }
  }, [open, employeeId]);

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Typography>Cargando detalles del empleado...</Typography>
        </DialogContent>
      </Dialog>
    );
  }

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
          maxWidth: "900px", // Ancho máximo ajustado
          width: "100%",
          height: "90vh", // Altura máxima del diálogo
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
        Detalles del Empleado
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto", // Hacer el contenido desplazable
          maxHeight: "70vh", // Altura máxima del contenido
        }}
      >
        {/* Información General */}
        {employeeInfo && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
              <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
                Información General
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography>
                  <strong>ID:</strong> {employeeInfo.id}
                </Typography>

                <Typography>
                  <strong>Planta:</strong> {employeeInfo.plant_id}
                </Typography>
                <Typography>
                  <strong>Nombre:</strong> {employeeInfo.first_name} {employeeInfo.second_name || ""}
                </Typography>
                <Typography>
                  <strong>Apellidos:</strong> {employeeInfo.last_name_paterno} {employeeInfo.last_name_materno}
                </Typography>
                <Typography>
                  <strong>Área de Trabajo:</strong> {employeeInfo.work_area_id}
                </Typography>
                <Typography>
                  <strong>Salario:</strong> {employeeInfo.salary}
                </Typography>
                <Typography>
                  <strong>Fecha de Ingreso:</strong> {employeeInfo.hire_date}
                </Typography>
                <Typography>
                  <strong>Fecha de Alta Nss:</strong> {employeeInfo.nss_date }
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Información Personal */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E3F2FD" }}>
            <Typography variant="h6" sx={{ color: "#3B82F6", fontWeight: "bold" }}>
              Información Personal
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {personalInfo ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography>
                  <strong>CURP:</strong> {personalInfo.curp}
                </Typography>
                <Typography>
                  <strong>RFC:</strong> {personalInfo.rfc}
                </Typography>
                <Typography>
                  <strong>Género:</strong> {personalInfo.gender}
                </Typography>
                <Typography>
                  <strong>Estado Civil:</strong> {personalInfo.marital_status}
                </Typography>
                <Typography>
                  <strong>Fecha de Nacimiento:</strong> {personalInfo.birth_date}
                </Typography>
                <Typography>
                  <strong>NSS:</strong> {personalInfo.nss}
                </Typography>
              </Box>
            ) : (
              <Typography>No hay información personal disponible.</Typography>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Dirección y Contacto */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#FFF7E6" }}>
            <Typography variant="h6" sx={{ color: "#F59E0B", fontWeight: "bold" }}>
              Dirección y Contacto
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {addressContact ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography>
                  <strong>Código Postal:</strong> {addressContact.postal_code}
                </Typography>
                <Typography>
                  <strong>Colonia:</strong> {addressContact.neighborhood}
                </Typography>
                <Typography>
                  <strong>Estado:</strong> {addressContact.state}
                </Typography>
                <Typography>
                  <strong>Municipio:</strong> {addressContact.municipality}
                </Typography>
                <Typography>
                  <strong>Calle y Número:</strong> {addressContact.street_and_number}
                </Typography>
                <Typography>
                  <strong>Teléfono:</strong> {addressContact.phone_number}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {addressContact.email}
                </Typography>
              </Box>
            ) : (
              <Typography>No hay información de dirección y contacto disponible.</Typography>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Datos de Beneficiario */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E6F4EA" }}>
            <Typography variant="h6" sx={{ color: "#10B981", fontWeight: "bold" }}>
              Datos de Beneficiario
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {beneficiary ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography>
                  <strong>Nombre:</strong> {beneficiary.first_name} {beneficiary.last_name}
                </Typography>
                <Typography>
                  <strong>Fecha de Nacimiento:</strong> {beneficiary.birth_date}
                </Typography>
                <Typography>
                  <strong>Parentesco:</strong> {beneficiary.relationship}
                </Typography>
                <Typography>
                  <strong>Teléfono:</strong> {beneficiary.phone_number}
                </Typography>
                <Typography>
                  <strong>Porcentaje:</strong> {beneficiary.percentage}%
                </Typography>
              </Box>
            ) : (
              <Typography>No hay información de beneficiario disponible.</Typography>
            )}
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

export default EmployeeDetailsDialog;