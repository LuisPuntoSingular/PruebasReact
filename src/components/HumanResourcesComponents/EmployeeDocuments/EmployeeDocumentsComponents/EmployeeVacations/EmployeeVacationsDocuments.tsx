import React from "react";
import {
  Box, Typography, List, ListItem, ListItemText, Divider, Button, Chip, Stack, Paper, Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider, StaticDatePicker, PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEmployeeVacations } from "./hooks/useEmployeeVacations";
import { VacationRequestStatus } from "./types/vacationTypes";

interface EmployeeVacationsContentProps {
  employeeId: number;
  decisionById: number; // usuario que toma la decisión (puede venir del contexto)
}

const statusColor = {
  approved: "#10B981",
  pending: "#F59E42",
  rejected: "#EF4444",
  cancelled: "#6B7280",
};

const statusLabel = {
  approved: "Aprobada",
  pending: "Pendiente",
  rejected: "Rechazada",
  cancelled: "Cancelada",
};

const EmployeeVacationsContent: React.FC<EmployeeVacationsContentProps> = ({
  employeeId,
  decisionById,
}) => {
  const {
    balance,
    requests,
    reloadBalance,
    submitRequest,
    changeRequestStatus,
  } = useEmployeeVacations(employeeId);



const [reloading, setReloading] = React.useState(false);


  // Estado local para nueva solicitud
  const [newRequest, setNewRequest] = React.useState<{
    year: number;
    selectedDates: string[];
    calendarMonth: Dayjs;
  }>(() => {
    const currentYear = dayjs().year();
    return {
      year: currentYear,
      selectedDates: [],
      calendarMonth: dayjs(),
    };
  });

  // Actualiza año si cambia el balance
  React.useEffect(() => {
    if (balance.length > 0 && !balance.some(b => b.year === newRequest.year)) {
      setNewRequest(prev => ({
        ...prev,
        year: balance[0].year,
        calendarMonth: prev.calendarMonth.year(balance[0].year),
        selectedDates: [],
      }));
    }
    // eslint-disable-next-line
  }, [balance]);

  // Balance y días disponibles del año seleccionado
  const yearBalance = balance.find(y => y.year === newRequest.year);
  const availableDays = yearBalance
    ? Number(yearBalance.accumulated_days) - Number(yearBalance.used_days)
    : 0;
  const requestedDays = newRequest.selectedDates.length;
  const canRequest = requestedDays > 0 && requestedDays <= availableDays;

  // Cambiar año y limpiar selección
  const handleYearChange = (year: number) => {
    setNewRequest(prev => ({
      ...prev,
      year,
      selectedDates: [],
      calendarMonth: prev.calendarMonth.year(year),
    }));
  };

  // Cambiar mes en el calendario
  const handleMonthChange = (date: Dayjs) => {
    setNewRequest(prev => ({
      ...prev,
      calendarMonth: date,
    }));
  };

  // Selección múltiple de días en el calendario
  const handleDaySelect = (date: Dayjs) => {
    if (date.year() !== newRequest.year) return;
    const dateStr = date.format("YYYY-MM-DD");
    setNewRequest(prev => ({
      ...prev,
      selectedDates: prev.selectedDates.includes(dateStr)
        ? prev.selectedDates.filter(d => d !== dateStr)
        : [...prev.selectedDates, dateStr],
    }));
  };

  // Enviar solicitud
  const handleSubmit = async () => {
    await submitRequest(
      newRequest.selectedDates.map(date => ({ date }))
    );
    setNewRequest(prev => ({
      ...prev,
      selectedDates: [],
    }));
  };

  // Cambiar estatus de solicitud
  const handleRequestAction = async (
    id: number,
    action: VacationRequestStatus
  ) => {
    await changeRequestStatus(id, action, decisionById);
  };

  const handleReloadBalance = async () => {
    setReloading(true);
    try {
      await reloadBalance();
      alert("Balance de vacaciones actualizado correctamente.");
    } catch  {
      alert("Error al actualizar el balance de vacaciones.");
    } finally {
      setReloading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F3F4F6", minHeight: "100vh", py: 3 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 410,
          mx: "auto",
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ color: "#1E3A8A", fontWeight: "bold", textAlign: "center", flex: 1 }}>
            Control de Vacaciones
          </Typography>
          <Tooltip title="Actualizar balance de vacaciones">
            <span>
              <IconButton onClick={handleReloadBalance} disabled={reloading}>
                <RefreshIcon sx={{ color: "#7C3AED" }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <List sx={{ mb: 2 }}>
          {balance.map((yearData, i) => (
            <React.Fragment key={yearData.year}>
              <ListItem sx={{ flexDirection: "column", alignItems: "flex-start", gap: 1, px: 0 }}>
                <ListItemText
                  primary={<Typography fontWeight="bold">Año {yearData.year}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Días disponibles: <strong>{Number(yearData.accumulated_days) - Number(yearData.used_days)}</strong> / {yearData.accumulated_days}
                      </Typography>
                      <Stack spacing={1}>
                        {requests
                          .filter((r) =>
                            r.days.some(d => dayjs(d.vacation_date).year() === yearData.year)
                          )
                          .map((r) => (
                            <Box
                              key={r.id}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flexWrap: "wrap",
                                background: "#F9FAFB",
                                borderRadius: 1,
                                px: 1,
                                py: 0.5,
                                mb: 0.5,
                                minWidth: 260,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: statusColor[r.status as keyof typeof statusColor],
                                  fontWeight: 500,
                                  flex: 1,
                                  minWidth: 120,
                                  fontSize: "0.95rem",
                                }}
                              >
                                  {r.days.map(d => dayjs(d.vacation_date).format("DD/MM/YYYY")).join(", ")}
                              </Typography>
                              <Chip
                                label={`${r.days.length} día${r.days.length > 1 ? "s" : ""}`}
                                size="small"
                                sx={{
                                  bgcolor: "#E0E7FF",
                                  color: "#3730A3",
                                  fontWeight: 600,
                                  fontSize: "0.80rem",
                                }}
                              />
                              <Chip
                                label={statusLabel[r.status as keyof typeof statusLabel]}
                                size="small"
                                sx={{
                                  bgcolor: statusColor[r.status as keyof typeof statusColor],
                                  color: "#fff",
                                  fontWeight: 600,
                                  fontSize: "0.80rem",
                                }}
                              />
                              {r.status === "pending" && (
                                <>
                                  <Tooltip title="Aceptar solicitud" arrow>
                                    <Button
                                      size="small"
                                      color="success"
                                      variant="outlined"
                                      onClick={() => handleRequestAction(r.id, "approved")}
                                      sx={{ minWidth: 0, px: 1, fontSize: "0.75rem" }}
                                    >
                                      ✓
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Rechazar solicitud" arrow>
                                    <Button
                                      size="small"
                                      color="error"
                                      variant="outlined"
                                      onClick={() => handleRequestAction(r.id, "rejected")}
                                      sx={{ minWidth: 0, px: 1, fontSize: "0.75rem" }}
                                    >
                                      ✗
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Cancelar solicitud" arrow>
                                    <Button
                                      size="small"
                                      color="inherit"
                                      variant="outlined"
                                      onClick={() => handleRequestAction(r.id, "cancelled")}
                                      sx={{ minWidth: 0, px: 1, fontSize: "0.75rem" }}
                                    >
                                      ⎌
                                    </Button>
                                  </Tooltip>
                                </>
                              )}
                            </Box>
                          ))}
                      </Stack>
                    </>
                  }
                />
              </ListItem>
              {i < balance.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, textAlign: "center" }}>
          Registrar Solicitud
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, my: 1 }}>
          {/* Selector de año compacto y centrado */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Año:
            </Typography>
            <select
              value={newRequest.year}
              onChange={e => handleYearChange(Number(e.target.value))}
              style={{
                minWidth: 70,
                background: "#F3F4F6",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                padding: "2px 8px",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              {balance.map(y => (
                <option key={y.year} value={y.year}>
                  {y.year}
                </option>
              ))}
            </select>
          </Box>

          <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5, textAlign: "center" }}>
            Selecciona los días:
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={newRequest.calendarMonth}
                onMonthChange={handleMonthChange}
                onYearChange={date => {
  if (dayjs.isDayjs(date)) {
    handleYearChange(date.year());
  } else if (date instanceof Date) {
    handleYearChange(date.getFullYear());
  }
}}
                onChange={() => {}}
                showDaysOutsideCurrentMonth={false}
                disablePast
                slotProps={{
                  actionBar: { sx: { display: "none" } }
                }}
                slots={{
                  day: (props) => {
                    const day = props.day;
                    const dayJsObj = dayjs.isDayjs(day) ? day : dayjs(day);
                    const dateStr = dayJsObj.format("YYYY-MM-DD");
                    const selected = newRequest.selectedDates.includes(dateStr);
                    const isDisabled = dayJsObj.year() !== newRequest.year;
                    return (
                      <PickersDay
                        {...props}
                        disabled={isDisabled}
                        selected={selected}
                        onDaySelect={(selectedDay) => {
                          if (!isDisabled) handleDaySelect(dayjs(selectedDay));
                        }}
                        sx={{
                          borderRadius: "50%",
                          border: selected ? "2px solid #7C3AED" : "1px solid #D1D5DB",
                          color: selected ? "#fff" : "#7C3AED",
                          background: selected ? "#7C3AED" : "#fff",
                          fontWeight: 600,
                          fontSize: "0.98rem",
                          minWidth: 32,
                          minHeight: 32,
                          transition: "all 0.2s",
                          boxShadow: selected ? "0 2px 8px #7C3AED22" : "none",
                          "&:hover": {
                            background: selected ? "#5B21B6" : "#E0E7FF",
                            color: selected ? "#fff" : "#7C3AED",
                            borderColor: "#7C3AED",
                          },
                        }}
                      />
                    );
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: requestedDays > availableDays ? "#EF4444" : "#10B981",
              fontWeight: 500,
              mb: 1,
              textAlign: "center",
            }}
          >
            {requestedDays > availableDays
              ? "No puedes solicitar más días de los disponibles."
              : `Días seleccionados: ${requestedDays} / Disponibles: ${availableDays}`}
          </Typography>
          <Button
            variant="contained"
            disabled={!canRequest}
            sx={{
              background: "#7C3AED",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: 1,
              borderRadius: 2,
              py: 1,
              mt: 1,
              textTransform: "uppercase",
              boxShadow: "0 2px 8px #7C3AED22",
              "&:hover": {
                background: "#5B21B6",
              },
            }}
            fullWidth
            onClick={handleSubmit}
          >
            Solicitar Vacaciones
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeVacationsContent;