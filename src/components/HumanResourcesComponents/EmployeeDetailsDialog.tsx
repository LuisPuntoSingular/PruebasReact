import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,

} from "@mui/material";


// Importar las funciones de API  
import EmployeeGeneralInfo from "./EmployeesDetails/EmployeeGeneralDetailInfo";
import EmployeeBossInfo from "./EmployeesDetails/EmployeeBossDetailInfo";

import EmployeePersonalInfo from "./EmployeesDetails/EmployeePersonalDetailInfo";
import EmployeeAddressInfo from "./EmployeesDetails/EmployeeAddressDetailInfo";
import EmployeeBeneficiaryInfo from "./EmployeesDetails/EmployeeBeneficiaryDetailInfo";

import { useEmployeeGeneralInfo } from "./EmployeesDetails/ServicesEmployeesDetails/useEmployeeGeneralInfo";

import { useEmployeeBoss } from "./EmployeesDetails/ServicesEmployeesDetails/useEmployeeBoss";


import { useEmployeePersonalInfo } from "./EmployeesDetails/ServicesEmployeesDetails/useEmployeePersonalInfo";

import { useEmployeeBeneficiary } from "./EmployeesDetails/ServicesEmployeesDetails/useEmployeeBeneficiary";
import { useEmployeeAddress } from "./EmployeesDetails/ServicesEmployeesDetails/useEmployeeAddress";
import { getEmployeeById } from "./Apis/employeeApi";
import { getEmployeePersonalInformationById } from "./Apis/employeePersonalInformationApi";
import { getEmployeeBeneficiaryById } from "./Apis/employeeBeneficiaryApi";
import { getEmployeeAddressById } from "./Apis/employeeAdressContactApi";
import { getEmployeeSupervisorById } from "./Apis/employeeBossApi";
import { EmployeeSupervisor } from "./Apis/employeeBossApi";



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
  plant_id?: number; // Cambiar a solo number para coincidir con la definición de la API
  is_boss?: boolean; 
}

// Información personal del empleado
interface PersonalInfo {
  employee_id: number;
  curp?: string;
  rfc?: string;
  gender: string;
  marital_status: string;
  birth_date: string;
  nss?: string;
  is_card?: boolean;
  cardname?: string;
}

// Dirección y contacto del empleado
interface AddressContact {
  employee_id: number;
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
  employee_id: number;
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
  const [bossInfo, setBossInfo] = useState<EmployeeSupervisor | null>(null);

  const [loading, setLoading] = useState(true);


    useEffect(() => {
    if (open) {
      const fetchEmployeeDetails = async () => {
        setLoading(true);
        try {
          const personalData: PersonalInfo = await getEmployeePersonalInformationById(employeeId);
          const addressData: AddressContact = await getEmployeeAddressById(employeeId);
          const beneficiaryData: Beneficiary = await getEmployeeBeneficiaryById(employeeId);
          const generalData: Employee = await getEmployeeById(employeeId);
          const bossData: EmployeeSupervisor = await getEmployeeSupervisorById(employeeId);
          setBossInfo(bossData);

          setPersonalInfo(personalData);
          setAddressContact(addressData);
          
          setBeneficiary(beneficiaryData);
          setEmployeeInfo(generalData);
        } catch (error) {
          console.error("Error al obtener los detalles del empleado:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeDetails();
    }
  }, [open, employeeId]);

      // Hook para manejar la dirección y update solo cuando ya tienes addressContact
    const generalInfoHook = useEmployeeGeneralInfo(employeeInfo);
    const personalInfoHook = useEmployeePersonalInfo(personalInfo);

    const addressHook = useEmployeeAddress(addressContact)
    const beneficiaryHook = useEmployeeBeneficiary(beneficiary);
    const bossHook = useEmployeeBoss(bossInfo);



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
        {generalInfoHook.employee && (
   <EmployeeGeneralInfo
  employeeInfo={generalInfoHook.employee}
  onUpdate={async (updated: Partial<Employee>) => {
    await generalInfoHook.updateGeneralInfo({ ...updated, id: employeeId });
  }}
/>
  )} 

        <EmployeePersonalInfo
  personalInfo={personalInfoHook.personalInfo}
  onUpdate={async (updated) => {
    await personalInfoHook.updatePersonalInfo({ ...updated, employee_id: employeeId });
  }}
/>

  
{addressHook.address && (
  <EmployeeAddressInfo
    addressContact={addressHook.address}
    onUpdate={async (updated) => {
      // Forzar el employee_id correcto
      await addressHook.updateAddress({ ...updated, employee_id: employeeId });
    }}
  />
)}
         {beneficiaryHook.beneficiary && (
          <EmployeeBeneficiaryInfo
            beneficiary={beneficiaryHook.beneficiary}
            onUpdate={async (updated) => {
              // Forzar el employee_id correcto
              await beneficiaryHook.updateBeneficiary({ ...updated, employee_id: employeeId });
            }}
          />
        )}

        {bossHook.boss && (
  <EmployeeBossInfo
    bossInfo={bossHook.boss}
    onUpdate={async (updated) => {
      await bossHook.updateBoss({ ...updated, employee_id: employeeId });
    }}
  />
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