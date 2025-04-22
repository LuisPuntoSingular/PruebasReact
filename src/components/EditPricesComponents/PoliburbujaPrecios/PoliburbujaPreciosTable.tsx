import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { usePoliburbujaPrecios } from "./usePoliburbujaPrecios";
import AddIcon from "@mui/icons-material/Add";

interface PoliburbujaPrecio {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: number;
  idpoliburbuja: number;
  ancho_rollo: number;
  largo_rollo: number;
}

const PoliburbujaPreciosTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<PoliburbujaPrecio>({
    medidas: "",
    precio: 0,
    idpoliburbuja: 0,
    ancho_rollo: 0,
    largo_rollo: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<PoliburbujaPrecio | null>(null);

  const { columns, data, deleteRecord, createRecord, updateRecord } = usePoliburbujaPrecios();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.medidas) newErrors.medidas = "Las medidas son obligatorias";
    if (!formData.precio || isNaN(Number(formData.precio))) newErrors.precio = "El precio debe ser un número válido";
    if (!formData.idpoliburbuja) newErrors.idpoliburbuja = "El ID Poliburbuja es obligatorio";
    if (!formData.ancho_rollo || isNaN(Number(formData.ancho_rollo))) newErrors.ancho_rollo = "El ancho del rollo debe ser un número válido";
    if (!formData.largo_rollo || isNaN(Number(formData.largo_rollo))) newErrors.largo_rollo = "El largo del rollo debe ser un número válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      createRecord(formData);
      setOpenModal(false);
      resetForm();
    }
  };

  const handleEdit = (row: PoliburbujaPrecio) => {
    setFormData(row);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleUpdate = () => {
    if (validateForm()) {
      updateRecord(formData);
      setOpenModal(false);
      resetForm();
    }
  };

  const handleDelete = (row: PoliburbujaPrecio) => {
    setSelectedRow(row);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      deleteRecord(selectedRow);
    }
    setOpenConfirmDialog(false);
    setSelectedRow(null);
  };

  const resetForm = () => {
    setFormData({
      medidas: "",
      precio: 0,
      idpoliburbuja: 0,
      ancho_rollo: 0,
      largo_rollo: 0,
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            resetForm();
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? "Editar Registro" : "Agregar Nuevo Registro"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Medidas"
            name="medidas"
            value={formData.medidas}
            onChange={handleInputChange}
            error={!!errors.medidas}
            helperText={errors.medidas}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            error={!!errors.precio}
            helperText={errors.precio}
            fullWidth
          />
          <TextField
            margin="dense"
            label="ID Poliburbuja"
            name="idpoliburbuja"
            value={formData.idpoliburbuja}
            onChange={handleInputChange}
            error={!!errors.idpoliburbuja}
            helperText={errors.idpoliburbuja}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Ancho Rollo"
            name="ancho_rollo"
            value={formData.ancho_rollo}
            onChange={handleInputChange}
            error={!!errors.ancho_rollo}
            helperText={errors.ancho_rollo}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Largo Rollo"
            name="largo_rollo"
            value={formData.largo_rollo}
            onChange={handleInputChange}
            error={!!errors.largo_rollo}
            helperText={errors.largo_rollo}
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

export default PoliburbujaPreciosTable;