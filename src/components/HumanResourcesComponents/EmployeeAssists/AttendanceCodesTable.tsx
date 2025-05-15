import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

export interface AttendanceCode {
  code: string;
  description: string;
}

interface Props {
  attendanceCodes: AttendanceCode[];
}

const AttendanceCodesTable: React.FC<Props> = ({ attendanceCodes }) => (
  <Box sx={{ width: 340, mb: 3 }}>
    <Typography variant="h6" sx={{ mb: 1 }}>Códigos de Asistencia</Typography>
    <TableContainer component={Paper} elevation={3}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "0.95rem" }}><b>Código</b></TableCell>
            <TableCell sx={{ fontSize: "0.95rem" }}><b>Descripción</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceCodes.map((code) => (
            <TableRow key={code.code}>
              <TableCell sx={{ fontSize: "0.90rem" }}>{code.code}</TableCell>
              <TableCell sx={{ fontSize: "0.90rem" }}>{code.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default AttendanceCodesTable;