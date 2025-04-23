import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Menu,
  MenuItem as DropdownMenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface BaseTableProps<T> {
  columns: (keyof T)[];
  data: T[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}


const BaseTable = <T,>({
  columns,
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: BaseTableProps<T>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<T | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <TableContainer
    component={Paper}
    sx={{
      borderRadius: "4px", // Esquinas ligeramente redondeadas
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra suave
      overflow: "hidden", // Evita que el contenido sobresalga
      border: "1px solid #E0E0E0", // Borde gris claro
      overflowX: "auto", // Habilita el desplazamiento horizontal en pantallas pequeñas
    }}
  >
    <Table
      sx={{
        minWidth: "600px", // Asegura un ancho mínimo para que las tablas no se compriman demasiado
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: "#F5F5F5", // Fondo gris claro
          }}
        >
          {columns.map((column) => (
            <TableCell
              key={String(column)}
              sx={{
                color: "#424242", // Texto gris oscuro
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "0.875rem",
                padding: "10px 14px", // Espaciado interno
                borderBottom: "1px solid #E0E0E0", // Línea divisoria
              }}
            >
              {String(column)}
            </TableCell>
          ))}
          <TableCell
            sx={{
              color: "#424242",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.875rem",
              padding: "10px 14px",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            Acciones
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#FAFAFA", // Fondo gris muy claro para filas impares
                },
                "&:hover": {
                  backgroundColor: "#F0F0F0", // Fondo gris más oscuro al pasar el mouse
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column)}
                  sx={{
                    color: "#616161", // Texto gris medio
                    fontSize: "0.875rem",
                    padding: "10px 14px",
                    borderBottom: "1px solid #E0E0E0", // Línea divisoria
                  }}
                >
                  {String(row[column])}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  padding: "10px 14px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <IconButton
                  onClick={(e) => handleMenuOpen(e, row)}
                  size="small"
                  sx={{
                    color: "#616161", // Icono gris medio
                    "&:hover": {
                      color: "#424242", // Gris más oscuro al pasar el mouse
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      sx={{
        backgroundColor: "#F9F9F9", // Fondo gris muy claro
        borderTop: "1px solid #E0E0E0", // Línea superior
        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
          color: "#757575", // Texto gris
        },
        "& .MuiTablePagination-actions button": {
          color: "#616161", // Botones grises
        },
      }}
    />
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "4px", // Esquinas ligeramente redondeadas
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra suave
          border: "1px solid #E0E0E0", // Borde gris claro
        },
      }}
    >
      <DropdownMenuItem
        onClick={() => selectedRow && onEdit(selectedRow)}
        sx={{
          color: "#424242", // Gris oscuro
          "&:hover": {
            backgroundColor: "#F0F0F0", // Fondo gris claro al pasar el mouse
          },
        }}
      >
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => selectedRow && onDelete(selectedRow)}
        sx={{
          color: "#D32F2F", // Rojo Material Design
          "&:hover": {
            backgroundColor: "#FFEBEE", // Fondo rojo claro al pasar el mouse
          },
        }}
      >
        Eliminar
      </DropdownMenuItem>
    </Menu>
  </TableContainer>
  );
};

export default BaseTable;