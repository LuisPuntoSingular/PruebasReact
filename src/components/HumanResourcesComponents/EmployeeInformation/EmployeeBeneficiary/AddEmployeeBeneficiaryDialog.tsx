import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

interface AddEmployeeBeneficiaryFieldsProps {
  beneficiaryInfo: {
    employee_id: number;
    first_name: string;
    last_name: string;
    birth_date: string;
    relationship: string;
    phone_number: string;
    percentage: string;
  };
  setBeneficiaryInfo: React.Dispatch<
    React.SetStateAction<{
      employee_id: number;
      first_name: string;
      last_name: string;
      birth_date: string;
      relationship: string;
      phone_number: string;
      percentage: string;
    }>
  >;
}

const AddEmployeeBeneficiaryFields: React.FC<AddEmployeeBeneficiaryFieldsProps> = ({
  beneficiaryInfo,
  setBeneficiaryInfo,
}) => {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {/* Nombre */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Nombre"
          value={beneficiaryInfo.first_name}
          onChange={(e) =>
            setBeneficiaryInfo({
              ...beneficiaryInfo,
              first_name: formatText(e.target.value), // Formatear texto
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Apellidos */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Apellidos"
          value={beneficiaryInfo.last_name}
          onChange={(e) =>
            setBeneficiaryInfo({
              ...beneficiaryInfo,
              last_name: formatText(e.target.value), // Formatear texto
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Fecha de Nacimiento */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Fecha de Nacimiento"
          type="date"
          value={beneficiaryInfo.birth_date}
          onChange={(e) =>
            setBeneficiaryInfo({
              ...beneficiaryInfo,
              birth_date: e.target.value,
            })
          }
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { color: "#6B7280" },
          }}
        />
      </Box>

      {/* Parentesco */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Parentesco"
          value={beneficiaryInfo.relationship}
          onChange={(e) =>
            setBeneficiaryInfo({
              ...beneficiaryInfo,
              relationship: e.target.value,
            })
          }
          select
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        >
          <MenuItem value="Abuela/o">Abuela/o</MenuItem>
<MenuItem value="Amiga/o">Amiga/o</MenuItem>
<MenuItem value="Concubina/o">Concubina/o</MenuItem>
<MenuItem value="Cuñada/o">Cuñada/o</MenuItem>
<MenuItem value="Esposa/o">Esposa/o</MenuItem>
<MenuItem value="Hermana/o">Hermana/o</MenuItem>
<MenuItem value="Hija/o">Hija/o</MenuItem>
<MenuItem value="Madrastra">Madrastra</MenuItem>
<MenuItem value="Madre">Madre</MenuItem>
<MenuItem value="Padrastro">Padrastro</MenuItem>
<MenuItem value="Padre">Padre</MenuItem>
<MenuItem value="Pareja">Pareja</MenuItem>
<MenuItem value="Prima/o">Prima/o</MenuItem>
<MenuItem value="Sobrina/o">Sobrina/o</MenuItem>
<MenuItem value="Suegra/o">Suegra/o</MenuItem>
<MenuItem value="Tía/o">Tía/o</MenuItem>
<MenuItem value="Otro">Otro</MenuItem>
        </TextField>
      </Box>

      {/* Teléfono */}
      <Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
        <TextField
          required
          label="Teléfono"
          value={beneficiaryInfo.phone_number}
          onChange={(e) =>
            setBeneficiaryInfo({
              ...beneficiaryInfo,
              phone_number: validateNumericInput(e.target.value), // Validar solo números
            })
          }
          fullWidth
          InputLabelProps={{
            style: { color: "#6B7280" },
          }}
        />
      </Box>

     {/* Porcentaje */}
<Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
  <TextField
    required
    label="Porcentaje"
    value={beneficiaryInfo.percentage}
    onChange={(e) => {
      const value = validateNumericInput(e.target.value); // Validar solo números
      const percentage = Math.max(0, Math.min(100, parseInt(value) || 0)); // Limitar entre 1 y 100
      setBeneficiaryInfo({
        ...beneficiaryInfo,
        percentage: percentage.toString(),
      });
    }}
    fullWidth
    InputLabelProps={{
      style: { color: "#6B7280" },
    }}
  />
</Box>
    </Box>
  );
};

export default AddEmployeeBeneficiaryFields;