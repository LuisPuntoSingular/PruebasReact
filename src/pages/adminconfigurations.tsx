import React, { useRef } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import Handsontable from 'handsontable';

import 'handsontable/dist/handsontable.full.min.css';

registerAllModules(); // Registra todos los módulos necesarios

const TablaNomina: React.FC = () => {
  const hotRef = useRef<Handsontable.Core>(null); // Usa el tipo correcto para la referencia

  const data = [
    ['FERNANDO REGALADO', 'A', 1, 'A', 0, 'A', 2, 'A', 1, 'A', 0],
    ['JUAN PÉREZ', 'F', 0, 'A', 0, 'A', 1, 'A', 0, 'F', 0],
  ];

  const colHeaders = [
    'Nombre',
    'Lunes', 'TE',
    'Martes', 'TE',
    'Miércoles', 'TE',
    'Jueves', 'TE',
    'Viernes', 'TE'
  ];

  const handleExportExcel = () => {
    const hotInstance = hotRef.current; // Accede correctamente a la instancia de Handsontable
    if (hotInstance) {
      hotInstance.getPlugin('exportFile').downloadFile('csv', {
        filename: 'asistencias_nomina',
        columnHeaders: true,
        rowHeaders: true,
        bom: true,
        mimeType: 'application/vnd.ms-excel',
        fileExtension: 'xls'
      });
    }
  };

  return (
    <div>
      <h3>Tabla de Asistencias</h3>
      <button onClick={handleExportExcel}>Exportar a Excel</button>
      <HotTable
        ref={(instance) => {
          if (instance) {
            hotRef.current = instance.hotInstance;
          }
        }} // Usa la referencia con el tipo correcto
        data={data}
        colHeaders={colHeaders}
        rowHeaders={true}
        width="100%"
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        stretchH="all"
        columns={[
          { type: 'text' },
          { type: 'text' }, { type: 'numeric' },
          { type: 'text' }, { type: 'numeric' },
          { type: 'text' }, { type: 'numeric' },
          { type: 'text' }, { type: 'numeric' },
          { type: 'text' }, { type: 'numeric' },
        ]}
      />
    </div>
  );
};

export default TablaNomina;