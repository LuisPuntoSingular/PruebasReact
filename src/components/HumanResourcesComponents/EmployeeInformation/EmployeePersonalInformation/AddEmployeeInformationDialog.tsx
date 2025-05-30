import React from "react";
import { TextField, MenuItem, Box,RadioGroup, FormControlLabel, Radio,FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

interface AddEmployeeInformationDialogProps {
  personalInfo: {
    employee_id: number;
    curp: string;
    rfc: string;
    gender: string;
    marital_status: string;
    birth_date: string;
    nss: string;
    is_card: boolean;
    cardname: string;
  };
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      curp: string;
      rfc: string;
      gender: string;
      marital_status: string;
      birth_date: string;
      nss: string;
      is_card: boolean;
      cardname: string;
    }>
  >;
}

const AddEmployeeInformationDialog: React.FC<AddEmployeeInformationDialogProps> = ({
  personalInfo,
  setPersonalInfo,
}) => {
  // Función para formatear texto: convertir todo a mayúsculas
  const formatText = (text: string) => {
    return text.toUpperCase();
  };

  // Longitudes máximas para CURP, RFC y NSS
  const MAX_CURP_LENGTH = 18;
  const MAX_RFC_LENGTH = 13;
  const MAX_NSS_LENGTH = 11;

  // Función para validar que solo se ingresen números
  const validateNumericInput = (text: string) => {
    return text.replace(/[^0-9]/g, ""); // Elimina cualquier carácter que no sea un número
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >

 
 


{/* ¿Tiene tarjeta y banco? */}
<Box sx={{ display: "flex", gap: "16px", alignItems: "center", width: "100%" }}>
  {/* RadioGroup para is_card */}
  <Box sx={{ flex: "1 1 50%" }}>
    <FormControl component="fieldset" sx={{ color: "#6B7280" }}>
      <RadioGroup
        row
        value={personalInfo.is_card ? "yes" : "no"}
        onChange={(e) =>
          setPersonalInfo({ ...personalInfo, is_card: e.target.value === "yes" })
        }
        name="is_card"
      >
        <FormControlLabel value="yes" control={<Radio color="primary" />} label="Sí" />
        <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
      </RadioGroup>
    </FormControl>
  </Box>

  {/* Select para el banco */}
  <Box sx={{ flex: "1 1 50%" }}>
    <TextField
      label="Banco"
      value={personalInfo.cardname || ""}
      onChange={(e) =>
        setPersonalInfo({ ...personalInfo, cardname: e.target.value })
      }
      select
      fullWidth
      InputLabelProps={{
        style: { color: "#6B7280" },
      }}
      disabled={!personalInfo.is_card} // Deshabilitar si no tiene tarjeta
    >
      <MenuItem value="Santander">Santander</MenuItem>
      <MenuItem value="Ban Bajío">Ban Bajío</MenuItem>
    </TextField>
  </Box>
</Box>


        {/* CURP */}
        <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
          <TextField
            label="CURP"
            value={personalInfo.curp}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                curp: formatText(e.target.value.slice(0, MAX_CURP_LENGTH)), // Formatear y restringir longitud
              })
            }
            fullWidth
            InputLabelProps={{
              style: { color: "#6B7280" },
            }}
          />
        </Box>

        {/* RFC */}
        <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
          <TextField
            label="RFC"
            value={personalInfo.rfc}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                rfc: formatText(e.target.value.slice(0, MAX_RFC_LENGTH)), // Formatear y restringir longitud
              })
            }
            fullWidth
            InputLabelProps={{
              style: { color: "#6B7280" },
            }}
          />
        </Box>

        {/* Sexo */}
        <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
          <TextField
            label="Sexo"
            required
            value={personalInfo.gender}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, gender: e.target.value })
            }
            select
            fullWidth
            InputLabelProps={{
              style: { color: "#6B7280" },
            }}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
          </TextField>
        </Box>

        {/* Estado Civil */}
        <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
          <TextField
             required
            label="Estado Civil"
            value={personalInfo.marital_status}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                marital_status: e.target.value,
              })
            }
            select
            fullWidth
            InputLabelProps={{
              style: { color: "#6B7280" },
            }}
          >
            <MenuItem value="Soltero">Soltero</MenuItem>
            <MenuItem value="Casado">Casado</MenuItem>
            <MenuItem value="Divorciado">Divorciado</MenuItem>
            <MenuItem value="Unión Libre">Unión Libre</MenuItem>
            <MenuItem value="Viudo">Viudo</MenuItem>
          </TextField>
        </Box>

        {/* Fecha de Nacimiento */}
        <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
  <TextField
    label="Fecha de Nacimiento"
    type="date"
    value={personalInfo.birth_date || ""} // Usar el valor actual o una cadena vacía
    onChange={(e) =>
      setPersonalInfo({
        ...personalInfo,
        birth_date: e.target.value, // Actualizar el estado con el nuevo valor
      })
    }
    fullWidth
    InputLabelProps={{
      shrink: true, // Asegurar que la etiqueta se mantenga arriba
      style: { color: "#6B7280" },
    }}
    required // Campo obligatorio
  />
</Box>

        {/* NSS */}
        <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
          <TextField
            label="NSS"
            value={personalInfo.nss}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                nss: validateNumericInput(e.target.value.slice(0, MAX_NSS_LENGTH)), // Validar solo números y restringir longitud
              })
            }
            fullWidth
            InputLabelProps={{
              style: { color: "#6B7280" },
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AddEmployeeInformationDialog;