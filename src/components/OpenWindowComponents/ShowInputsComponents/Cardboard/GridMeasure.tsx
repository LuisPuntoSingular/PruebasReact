import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import { useMeasures } from "@/context/CardBoardContext/CardboardMeasuresContext";

type Row = {
  part: string;
  largo: string;
  ancho: string;
  cantidad: string;
};

interface TableMeasuresProps {
  
}

const TableMeasures: React.FC<TableMeasuresProps> = ({
 
}) => {
  const { rejillaRows, setRejillaRows, setRejillaTotal, setTotalCantidad } = useMeasures();

  const handleInputChangeInternal = (
    index: number,
    field: keyof Row,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const updatedRows = [...rejillaRows];
    updatedRows[index][field] = value;
    setRejillaRows(updatedRows);
  };

  const handleAddRow = () => {
    if (rejillaRows.length < 5) {
      const nextLetter = String.fromCharCode(65 + rejillaRows.length);
      setRejillaRows([...rejillaRows, { part: nextLetter, largo: "", ancho: "", cantidad: "1" }]);
    }
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rejillaRows.filter((_, i) => i !== index);
    const updatedRows = newRows.map((row, i) => ({
      ...row,
      part: String.fromCharCode(65 + i),
    }));
    setRejillaRows(updatedRows);
  };

  useEffect(() => {
    // Calcular el total en m²
    const total = rejillaRows.reduce((sum, row) => {
      const largo = parseFloat(row.largo) || 0;
      const ancho = parseFloat(row.ancho) || 0;
      const cantidad = parseFloat(row.cantidad) || 0;

      return sum + (largo / 1000) * (ancho / 1000) * cantidad;
    }, 0);

    // Calcular la sumatoria de las cantidades
    const totalCantidad = rejillaRows.reduce((sum, row) => {
      const cantidad = parseFloat(row.cantidad) || 0;
      return sum + cantidad;
    }, 0);

    setRejillaTotal(total); // Actualizar el total en el contexto
    setTotalCantidad(totalCantidad); // Actualizar la cantidad total en el contexto
  }, [rejillaRows, setRejillaTotal, setTotalCantidad]);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          margin: "auto",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#1E293B", // Fondo oscuro
        }}
      >
        <Table aria-label="tabla medidas" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#FFFFFF", // Texto blanco
                  backgroundColor: "#334155", // Fondo de encabezado
                  textAlign: "center",
                }}
              >
                Part
              </TableCell>
              <TableCell
                sx={{
                  padding: "10px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                }}
              >
                Largo (mm)
              </TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                }}
              >
                Ancho (mm)
              </TableCell>
              <TableCell
                sx={{
                  padding: "0px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                }}
              >
                Cantidad
              </TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rejillaRows.map((row, index) => (
              <TableRow key={row.part}>
                <TableCell sx={{ padding: "0px", pl: 2, color: "#FFFFFF" }}>{row.part}</TableCell>
                {["largo", "ancho", "cantidad"].map((field) => (
                  <TableCell key={field} sx={{ padding: "1px" }}>
                    <TextField
                      value={row[field as keyof Row] || ""}
                      onChange={(e) => handleInputChangeInternal(index, field as keyof Row, e)}
                      fullWidth
                      variant="filled"
                      sx={{
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#334155", // Fondo oscuro
                          color: "#FFFFFF", // Texto blanco
                          borderRadius: "4px", // Bordes redondeados
                          "&:hover": {
                            backgroundColor: "#3B4252", // Fondo más claro al pasar el mouse
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#1E293B", // Fondo más oscuro al enfocar
                            borderColor: "#3B82F6", // Borde azul al enfocar
                            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)", // Sombra azul al enfocar
                          },
                        },
                        "& .MuiFilledInput-underline:before": {
                          borderBottom: "1px solid #64748B", // Línea inferior gris
                        },
                        "& .MuiFilledInput-underline:after": {
                          borderBottom: "2px solid #3B82F6", // Línea inferior azul al enfocar
                        },
                        "& .MuiInputLabel-root": {
                          color: "#94A3B8", // Color del label
                          fontWeight: "bold", // Label en negrita
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3B82F6", // Color del label al enfocar
                        },
                      }}
                    />
                  </TableCell>
                ))}
                <TableCell sx={{ padding: "8px" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRow(index)}
                    disabled={rejillaRows.length <= 1}
                    sx={{
                      minWidth: "100px",
                      padding: "6px 16px",
                      fontSize: "0.875rem",
                      height: "36px",
                      textTransform: "none",
                      color: "#FFFFFF", // Texto blanco
                      borderColor: "#EF4444", // Borde rojo
                      "&:hover": {
                        backgroundColor: "#EF4444", // Fondo rojo al pasar el mouse
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", gap: 2, mt: 2, ml: 6 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E3A8A", // Azul oscuro
            color: "white",
            "&:hover": { backgroundColor: "#172554" }, // Un poco más oscuro al pasar el mouse
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: "150px",
          }}
          onClick={handleAddRow}
          disabled={rejillaRows.length >= 5}
        >
          Agregar Fila
        </Button>
      </Box>
    </Box>
  );
};

export default TableMeasures;