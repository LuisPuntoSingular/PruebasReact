import React,{useState} from "react";
import { TextField, Box } from "@mui/material";

interface AddEmployeeAddressFieldsProps {
  addressInfo: {
    employee_id: number;
    postal_code: string;
    neighborhood: string;
    state: string;
    municipality: string;
    street_and_number: string;
    phone_number: string;
    email: string;
  };
  setAddressInfo: React.Dispatch<
    React.SetStateAction<{
      employee_id: number;
      postal_code: string;
      neighborhood: string;
      state: string;
      municipality: string;
      street_and_number: string;
      phone_number: string;
      email: string;
    }>
  >;
}

const AddEmployeeAddressFields: React.FC<AddEmployeeAddressFieldsProps> = ({
  addressInfo,
  setAddressInfo,
}) => {
  const [emailError, setEmailError] = useState(false); // Estado para manejar el error del correo

  // Función para formatear texto: primera letra en mayúscula, resto en minúsculas
  const formatText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };

  // Función para validar que solo se ingresen números
  const validateNumericInput = (text: string) => {
    return text.replace(/[^0-9]/g, ""); // Elimina cualquier carácter que no sea un número
  };

  // Función para validar el formato del correo electrónico
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
    return emailRegex.test(email);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* Código Postal */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Código Postal"
          value={addressInfo.postal_code}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              postal_code: validateNumericInput(e.target.value), // Validar solo números
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Colonia */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Colonia"
          value={addressInfo.neighborhood}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              neighborhood: formatText(e.target.value), // Formatear texto
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Estado */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Estado"
          value={addressInfo.state}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              state: formatText(e.target.value), // Formatear texto
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Delegación / Municipio */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Delegación / Municipio"
          value={addressInfo.municipality}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              municipality: formatText(e.target.value), // Formatear texto
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Calle y Número */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Calle y Número"
          value={addressInfo.street_and_number}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              street_and_number: formatText(e.target.value), // Formatear texto
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Celular */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Celular"
          value={addressInfo.phone_number}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              phone_number: validateNumericInput(e.target.value), // Validar solo números
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Correo */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          label="Correo"
          value={addressInfo.email}
          onChange={(e) => {
            const email = e.target.value;
            setAddressInfo({
              ...addressInfo,
              email: email,
            });
            setEmailError(!validateEmail(email)); // Validar correo y actualizar el estado de error
          }}
          error={emailError} // Mostrar error si el correo no es válido
          helperText={emailError ? "Por favor, ingresa un correo válido." : ""} // Mensaje de error
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>
    </Box>
  );
};

export default AddEmployeeAddressFields;