import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEpe } from "./useEpe";

interface Epe {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: number;
}

const EpeTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<Epe | null>(null); // Cambiar `any` a `Epe | null`
  const {
    columns,
    data,
    formData,
    isEditing,
    handleInputChange,
    openDialog,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useEpe();

  const handleCreate = () => {
    if (validateForm()) {
      createRecord(formData);
      setOpenModal(false);
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      updateRecord(formData);
      setOpenModal(false);
    }
  };

  const handleDelete = (row: Epe) => {
    setOpenConfirmDialog(true);
    setSelectedRow(row);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      deleteRecord(selectedRow);
      setOpenConfirmDialog(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.medidas) newErrors.medidas = "Campo obligatorio";
    if (!formData.precio) newErrors.precio = "Campo obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div style={{ position: "relative", paddingTop: "40px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            openDialog();
            setOpenModal(true);
          }}
          sx={{
            position: "absolute",
            top: "0", // Posición en la parte superior del contenedor
            right: "16px", // Alineado a la derecha
            zIndex: 1,
            backgroundColor: "#1E88E5",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
        >
          <AddIcon />
        </Button>
        <BaseTable
          columns={columns}
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          onEdit={(row: Epe) => {
            openDialog(row);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>
  
      {/* Modal para crear/editar */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "16px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#1E88E5",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "12px 12px 0 0",
            padding: "16px",
          }}
        >
          {isEditing ? "Editar Registro" : "Agregar Nuevo Registro"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Medidas"
            name="medidas"
            value={formData.medidas || ""}
            onChange={handleInputChange}
            error={!!errors.medidas}
            helperText={errors.medidas}
            fullWidth
            sx={{
              marginBottom: "16px",
            }}
          />
          <TextField
            margin="dense"
            label="Precio"
            name="precio"
            value={formData.precio || ""}
            onChange={handleInputChange}
            error={!!errors.precio}
            helperText={errors.precio}
            fullWidth
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button
            onClick={() => setOpenModal(false)}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "8px",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={isEditing ? handleUpdate : handleCreate}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#1E88E5",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#1565C0",
              },
              borderRadius: "8px",
            }}
          >
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* Modal de confirmación */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "16px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#EF5350",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "12px 12px 0 0",
            padding: "16px",
          }}
        >
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              textAlign: "center",
              color: "#333333",
              marginBottom: "16px",
            }}
          >
            ¿Estás seguro de que deseas eliminar este registro?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button
            onClick={() => setOpenConfirmDialog(false)}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "8px",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{
              borderRadius: "8px",
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EpeTable;