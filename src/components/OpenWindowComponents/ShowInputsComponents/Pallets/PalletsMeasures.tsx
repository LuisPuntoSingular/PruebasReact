import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePallets } from "@/context/PalletsContext/PalletsContext";





type Row = {
  largo: string;
  ancho: string;
  espesor: string;
  cantidad: string;
};




const TableMeasures: React.FC = () => {
  const { rows, setRows, } = usePallets();

  const handleInputChangeInternal = (
    index: number,
    field: keyof Row,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    if (rows.length < 5) {
      setRows([...rows, { largo: "", ancho: "", espesor: "", cantidad: "1" }]);
    }
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          margin: "auto",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#1E293B",
        }}
      >
        <Table
          aria-label="tabla medidas"
          sx={{
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                  textAlign: "center",
                }}
              >
                Largo cm
              </TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                  textAlign: "center",
                }}
              >
                Ancho cm
              </TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                  textAlign: "center",
                }}
              >
                Espesor cm
              </TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                  textAlign: "center",
                }}
              >
                Cantidad
              </TableCell>
              <TableCell
                sx={{
                  padding: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  backgroundColor: "#334155",
                  textAlign: "center",
                }}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {["largo", "ancho", "espesor", "cantidad"].map((field) => (
                  <TableCell key={field} sx={{ padding: "1px", textAlign: "center" }}>
                    <TextField
                      value={row[field as keyof Row] || ""}
                      onChange={(e) => handleInputChangeInternal(index, field as keyof Row, e)}
                      fullWidth
                      variant="filled"
                      sx={{
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#334155",
                          color: "#FFFFFF",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: "#3B4252",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#1E293B",
                            borderColor: "#3B82F6",
                            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                          },
                        },
                        "& .MuiFilledInput-underline:before": {
                          borderBottom: "1px solid #64748B",
                        },
                        "& .MuiFilledInput-underline:after": {
                          borderBottom: "2px solid #3B82F6",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#94A3B8",
                          fontWeight: "bold",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3B82F6",
                        },
                      }}
                    />
                  </TableCell>
                ))}
                <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(index)}
                    disabled={rows.length <= 1}
                    sx={{
                      padding: "4px",
                      color: "#EF4444",
                      "&:hover": {
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E3A8A",
            color: "white",
            "&:hover": { backgroundColor: "#172554" },
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: "150px",
          }}
          onClick={handleAddRow}
          disabled={rows.length >= 5}
        >
          Agregar Fila
        </Button>
      </Box>
    </Box>
  );
};

export default TableMeasures;