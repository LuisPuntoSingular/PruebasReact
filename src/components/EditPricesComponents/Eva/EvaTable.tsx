import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEva } from "./useEva";

interface Eva {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medida: string;
  precio: number;
}

const EvaTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<Eva | null>(null); // Cambiar `any` a `Eva | null`
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
  } = useEva();

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

  const handleDelete = (row: Eva) => {
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
    if (!formData.medida) newErrors.medida = "Campo obligatorio";
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
          onEdit={(row: Eva) => {
            openDialog(row);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal para crear/editar */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Editar EVA" : "Agregar Nuevo EVA"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Medida"
            name="medida"
            value={formData.medida || ""}
            onChange={handleInputChange}
            error={!!errors.medida}
            helperText={errors.medida}
            fullWidth
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
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={isEditing ? handleUpdate : handleCreate} color="primary">
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmación */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este registro?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EvaTable;