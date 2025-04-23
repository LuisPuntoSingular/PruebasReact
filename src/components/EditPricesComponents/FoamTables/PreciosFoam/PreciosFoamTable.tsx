import React, { useState } from "react";
import BaseTable from "@/components/EditPricesComponents/BaseTable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePreciosFoam } from "./usePreciosFoam";
import { useFoam } from "../Foam/useFoam"; // Importar el hook de Foam


interface PreciosFoam {
  id?: number; // Opcional porque no estará presente al crear un nuevo registro
  medidas: string;
  precio: string;
  idfoam: string | number;
  ancho_rollo: string;
  largo_rollo: string;
}

const PreciosFoamTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<PreciosFoam | null>(null);

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
  } = usePreciosFoam();

  const { data: foamData } = useFoam(); // Obtener los datos de Foam

  // Filtrar los items de Foam para excluir "Placa"
  const filteredFoamData = foamData.filter((foam) => foam.derivado !== "Placa");

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

  const handleDelete = (row: PreciosFoam) => {
    setOpenConfirmDialog(true);
    setSelectedRow(row);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      deleteRecord({ ...selectedRow, idfoam: String(selectedRow.idfoam) });
      setOpenConfirmDialog(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.medidas) newErrors.medidas = "Campo obligatorio";
    if (!formData.precio) newErrors.precio = "Campo obligatorio";
    if (!formData.idfoam) newErrors.idfoam = "Campo obligatorio";
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
          columns={columns as (keyof PreciosFoam)[]}
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          onEdit={(row) => {
            openDialog({ ...row, idfoam: String(row.idfoam) });
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
            label="Medidas"
            name="medidas"
            value={formData.medidas || ""}
            onChange={handleInputChange}
            error={!!errors.medidas}
            helperText={errors.medidas}
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
          <FormControl fullWidth margin="dense" error={!!errors.idfoam}>
            <InputLabel id="idfoam-label">Derivado</InputLabel>
            <Select
            label= "De"
              labelId="idfoam-label"
              name="idfoam"
              value={formData.idfoam || ""}
              onChange={handleInputChange}
            >
              {filteredFoamData.map((foam) => (
                <MenuItem key={foam.id} value={foam.id}>
                  {foam.derivado} {/* Mostrar el nombre del derivado */}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="error">
              {errors.idfoam}
            </Typography>
          </FormControl>
          <TextField
            margin="dense"
            label="Ancho Rollo"
            name="ancho_rollo"
            value={formData.ancho_rollo || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Largo Rollo"
            name="largo_rollo"
            value={formData.largo_rollo || ""}
            onChange={handleInputChange}
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

export default PreciosFoamTable;