import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDerivatives } from "./useDerivatives";

interface Derivative {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  name: string;
  materialid: number;
}

const DerivativesTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<Derivative | null>(null); // Cambiar `any` a `Derivative | null`
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
  } = useDerivatives();

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

  const handleDelete = (row: Derivative) => {
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
    if (!formData.name) newErrors.name = "Campo obligatorio";
    if (!formData.materialid) newErrors.materialid = "Campo obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            openDialog();
            setOpenModal(true);
          }}
          sx={{
            position: "absolute",
            top: "-40px",
            right: "16px",
            zIndex: 1,
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
          onEdit={(row: Derivative) => {
            openDialog(row);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal para crear/editar */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Editar Registro" : "Agregar Nuevo Registro"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            margin="dense"
            label="ID Material"
            name="materialid"
            value={formData.materialid || ""}
            onChange={handleInputChange}
            error={!!errors.materialid}
            helperText={errors.materialid}
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

export default DerivativesTable;