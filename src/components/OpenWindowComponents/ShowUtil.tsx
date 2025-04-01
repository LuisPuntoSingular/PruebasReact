import React from "react";
import { TextField, Box } from "@mui/material";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";

const ShowUtil: React.FC = () => {
  const { utilidad, setUtilidad } = useSelectedValues();

  const handleUtilidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUtilidad(value === "" ? "" : parseFloat(value));
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "16px" }}>
      <TextField
      
        label="Utilidad (%)"
        type="number"
        fullWidth
        size="small"
        value={utilidad || ""}
        onChange={handleUtilidadChange}
        sx={{
            mt: 2,
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
      />
    </Box>
  );
};

export default ShowUtil;