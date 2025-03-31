import React from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { useApi } from "@/context/ApiContext";

// Componente de entrada de material
// Este componente permite al usuario seleccionar un material de una lista desplegable
interface MaterialInputProps {
  /// Propiedades del componente
  /// selectedMaterial: Material seleccionado actualmente
  selectedMaterial: string;
  handleMaterialChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaterialInput: React.FC<MaterialInputProps> = ({ selectedMaterial, handleMaterialChange }) => {
  const { materials, loading, error } = useApi(); // Hook para obtener los materiales desde la API
  if (loading) return <div>Cargando materiales...</div>; // Mensaje de carga
  if (error) return <p>Error: {error}</p>;
    
 
  
  return (
    <FormControl fullWidth sx={{ marginBottom: "16px" }}>
      <TextField
       size="small"
        fullWidth // Asegura que el campo ocupe todo el ancho disponible
        select
        label="Seleccionar Material"
        value={selectedMaterial}
        onChange={handleMaterialChange}
        sx={{
          background: "rgba(194, 176, 176, 0.34)", // Fondo del campo
          color: "#ffffff", // Color del texto
          borderRadius: "8px", // Bordes redondeados
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)", // Color del borde
            },
            "&:hover fieldset": {
              borderColor: "#ffffff", // Color del borde al pasar el mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff", // Color del borde cuando está enfocado
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)", // Color inicial del label
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ffffff", // Color del label cuando está enfocado
          },
        }}
      >
       {/* Renderiza las opciones dinámicamente */}
       {materials.map((material: any) => (
          <MenuItem key={material.id} value={material.name}>
            {material.name}
          </MenuItem>
        ))}</TextField>
    </FormControl>
  );
};

export default MaterialInput;