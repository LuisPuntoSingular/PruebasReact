import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import AddEmployeeGeneralInformation from "./EmployeeGeneralInformation/AddEmployeeGeneralInformation";
import AddEmployeeInformationDialog from "./EmployeePersonalInformation/AddEmployeeInformationDialog";
import AddEmployeeBeneficiaryFields from "./EmployeeBeneficiary/AddEmployeeBeneficiaryDialog";
import AddEmployeeAddressFields from "./EmployeeAddressContact/AddEmployeeAddressDialog";
import AddEmployeeBossDialog from "./EmployeeBoss/AddEmployeeBossDialog";
import { createEmployeeSupervisor } from "../Apis/employeeBossApi";
import { fetchBosses, Boss } from "../Apis/employeeApi";
import {
  createEmployeePersonalInformation,
} from "../Apis/employeePersonalInformationApi";
import {
  createEmployeeBeneficiary,
} from "../Apis/employeeBeneficiaryApi";
import {
  createEmployeeAddress,
} from "../Apis/employeeAdressContactApi";
import { createEmployee } from "../Apis/employeeApi";


interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
}




const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({
  open,
  onClose,
}) => {
  // Estado para AddEmployeeGeneralInformation
  const [newEmployee, setNewEmployee] = useState({
    employee_id: 0,
    plant_id: 0,
    first_name: "",
    second_name: "",
    last_name_paterno: "",
    last_name_materno: "",
    work_area_id: "",
    salary: "",
    hire_date: "",
    nss_date: null,
    status: true,
    is_boss: false,
  });
  

  // Estado para AddEmployeeInformationDialog
  const [personalInfo, setPersonalInfo] = useState({
    employee_id: 0,
    curp: "",
    rfc: "",
    gender: "",
    marital_status: "",
    birth_date: "",
    nss: "",
    is_card: false,
    cardname: "",
  });

  // Estado para AddEmployeeBeneficiaryFields
  const [beneficiaryInfo, setBeneficiaryInfo] = useState({
    employee_id: 0,
    first_name: "",
    last_name: "",
    birth_date: "",
    relationship: "",
    phone_number: "",
    percentage: "",
  });

  // Estado para AddEmployeeAddressFields
  const [addressInfo, setAddressInfo] = useState({
    employee_id: 0,
    postal_code: "",
    neighborhood: "",
    state: "",
    municipality: "",
    street_and_number: "",
    phone_number: "",
    email: "",
  });


  // Estados para alertas
  const [alertOpen, setAlertOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [selectedBoss, setSelectedBoss] = useState<string>(""); // "0" para "Sin jefe"

  // Estado para controlar la pestaña activa
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };


 useEffect(() => {
  const fetchBossesData = async () => {
    try {
      const data: Boss[] = await fetchBosses();
      console.log("Lista de jefes:", data); // Verifica la lista de jefes obtenida
      setBosses(data); // Usa directamente los datos proporcionados por la API
    } catch (error) {
      console.error("Error al obtener la lista de jefes:", error);
    }
  };

  fetchBossesData();
}, []);




  const handleSave = async () => {
    try {
      // Validación de campos obligatorios


      if (
        !newEmployee.plant_id || // Planta
        !newEmployee.first_name || // Primer Nombre
        !newEmployee.last_name_paterno || // Apellido Paterno
        !newEmployee.last_name_materno || // Apellido Materno
        !newEmployee.work_area_id || // Puesto
        !newEmployee.salary || // Salario
        !newEmployee.hire_date || // Fecha de Ingreso
        !personalInfo.gender || // Sexo
        !personalInfo.marital_status || // Estado Civil
        !personalInfo.birth_date || // Fecha de Nacimiento
        !beneficiaryInfo.first_name || // Nombre del Beneficiario
        !beneficiaryInfo.last_name || // Apellidos del Beneficiario
        !beneficiaryInfo.birth_date || // Fecha de Nacimiento del Beneficiario
        !beneficiaryInfo.relationship || // Parentesco
        !beneficiaryInfo.phone_number || // Teléfono del Beneficiario
        !beneficiaryInfo.percentage || // Porcentaje del Beneficiario
        !addressInfo.postal_code || // Código Postal
        !addressInfo.neighborhood || // Colonia
        !addressInfo.state || // Estado
        !addressInfo.municipality || // Delegación/Municipio
        !addressInfo.street_and_number || // Calle y Número
        !addressInfo.phone_number // Celular
      ) {

       

        setAlertOpen(true); // Muestra el Snackbar si faltan campos obligatorios
        return;
      }
  
      // Crear el empleado
    
      const createdEmployee = await createEmployee({
        plant_id: Number(newEmployee.plant_id),
        first_name: newEmployee.first_name,
        second_name: newEmployee.second_name,
        last_name_paterno: newEmployee.last_name_paterno,
        last_name_materno: newEmployee.last_name_materno,
        work_area_id: Number(newEmployee.work_area_id),
        salary: Number(newEmployee.salary),
        hire_date: newEmployee.hire_date,
        nss_date: newEmployee.nss_date || null,
        status: newEmployee.status,
        is_boss: newEmployee.is_boss,
      });
  
      // Verificar si el ID del empleado fue generado correctamente
      if (!createdEmployee.id) {
        setErrorAlertOpen(true); // Muestra el Snackbar de error
        setErrorMessage(
          "Hubo un problema al crear el empleado. Por favor, inténtalo de nuevo."
        );
        return;
      }

 
    await createEmployeeSupervisor({
      employee_id: createdEmployee.id,
      supervisor_id: Number(selectedBoss),
      start_date: new Date().toISOString().split("T")[0],
      end_date: null,
      active: true,
    });
  
      

  

  
    
       await createEmployeePersonalInformation({
        employee_id: createdEmployee.id,
        curp: personalInfo.curp || null,
        rfc: personalInfo.rfc || null,
        gender: personalInfo.gender,
        marital_status: personalInfo.marital_status,
        birth_date: personalInfo.birth_date,
        nss: personalInfo.nss || null,
        is_card: personalInfo.is_card,
        cardname: personalInfo.cardname || null,
      });

  
      // Guardar Información del Beneficiario

      await createEmployeeBeneficiary({
        employee_id: createdEmployee.id,
        first_name: beneficiaryInfo.first_name,
        last_name: beneficiaryInfo.last_name,
        birth_date: beneficiaryInfo.birth_date,
        relationship: beneficiaryInfo.relationship,
        phone_number: beneficiaryInfo.phone_number,
        percentage: parseFloat(beneficiaryInfo.percentage),
      });
   
  
    
      await createEmployeeAddress({
        employee_id: createdEmployee.id,
        postal_code: addressInfo.postal_code,
        neighborhood: addressInfo.neighborhood,
        state: addressInfo.state,
        municipality: addressInfo.municipality,
        street_and_number: addressInfo.street_and_number,
        phone_number: addressInfo.phone_number,
        email: addressInfo.email,
      });

       // Reiniciar los campos después de guardar
    setNewEmployee({
      employee_id: 0,
      plant_id: 0,
      first_name: "",
      second_name: "",
      last_name_paterno: "",
      last_name_materno: "",
      work_area_id: "",
      salary: "",
      hire_date: "",
      nss_date: null,
      status: true,
      is_boss: false,
    });

    setPersonalInfo({
      employee_id: 0,
      curp: "",
      rfc: "",
      gender: "",
      marital_status: "",
      birth_date: "",
      nss: "",
      is_card: false,
      cardname: "",
    });

    setBeneficiaryInfo({
      employee_id: 0,
      first_name: "",
      last_name: "",
      birth_date: "",
      relationship: "",
      phone_number: "",
      percentage: "",
    });

    setAddressInfo({
      employee_id: 0,
      postal_code: "",
      neighborhood: "",
      state: "",
      municipality: "",
      street_and_number: "",
      phone_number: "",
      email: "",
    });
    setSelectedBoss(""); // Reiniciar el jefe seleccionado




     
  
      // Mostrar mensaje de éxito
      setSuccessAlertOpen(true);
      onClose(); // Cierra el diálogo principal
    } catch (error) {
      console.error("Error al guardar la información:", error);
      setErrorAlertOpen(true); // Muestra el mensaje de error
      setErrorMessage(
        "Ocurrió un error inesperado al guardar la información. Por favor, inténtalo de nuevo."
      );
    }
  };

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
          maxWidth: "600px",
          width: "100%",
        },
      }}
    >

<Snackbar
  open={errorAlertOpen}
  autoHideDuration={4000}
  onClose={() => setErrorAlertOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setErrorAlertOpen(false)}
    severity="error"
    sx={{ width: "100%" }}
  >
    {errorMessage}
  </Alert>
</Snackbar>



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
        Información del Empleado
      </DialogTitle>

      {/* Tabs para navegación */}
      <Tabs
  value={tabIndex}
  onChange={handleTabChange}
  indicatorColor="primary"
  textColor="inherit"
  variant="fullWidth" // Las pestañas se ajustan al ancho disponible
  sx={{
    backgroundColor: "#1E293B",
    color: "#ffffff",
    textTransform: "none", 
  }}
>
  <Tab label="Información General" />
  <Tab label="Información Personal" />
  <Tab label="Beneficiario y Contacto" />
  <Tab label="Dirección y contacto" />
  <Tab label="Asignacion de Jefe" />
</Tabs>

      {/* Contenido del diálogo */}
      <DialogContent
        dividers
        sx={{
          padding: "24px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
        }}
      >
        {tabIndex === 0 && (
          <AddEmployeeGeneralInformation
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
          />
        )}

        {tabIndex === 1 && (
          <AddEmployeeInformationDialog
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        )}
        {tabIndex === 2 && (
          <AddEmployeeBeneficiaryFields
            beneficiaryInfo={beneficiaryInfo}
            setBeneficiaryInfo={setBeneficiaryInfo}
          />
        )}
        {tabIndex === 3 && (
          <AddEmployeeAddressFields
            addressInfo={addressInfo}
            setAddressInfo={setAddressInfo}
          />
        )}
         {tabIndex === 4 && (
         <AddEmployeeBossDialog
         employeeId={newEmployee.employee_id}
         bosses={bosses} // Pasar la lista de jefes
         selectedBoss={selectedBoss} // Pasar el jefe seleccionado
         setSelectedBoss={setSelectedBoss} // Pasar la función para actualizar el jefe seleccionado
       />
        )}
      </DialogContent>

      {/* Footer con botones */}
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
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#10B981",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#059669" },
          }}
        >
          Guardar
        </Button>
      </Box>

      {/* Snackbar para alertas */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Por favor, completa todos los campos obligatorios.
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Información guardada con éxito.
          <ul>
      <li>Información General</li>
      <li>Información Personal</li>
      <li>Información del Beneficiario</li>
      <li>Información de Dirección</li>
     
    </ul>


        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={4000}
        onClose={() => setErrorAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error al guardar la información. Por favor, inténtalo de nuevo.
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default AddEmployeeDialog;