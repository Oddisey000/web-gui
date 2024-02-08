import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', display: 'none' },
  { field: 'login', headerName: 'Login' },
  { field: 'role', headerName: 'User role', width: 130 },
  { field: 'isActive', headerName: 'Active user' },
  { field: 'nfcCode', headerName: 'NFC/RFID code' },
  { field: 'dateCreated', headerName: 'Created on' },
  { field: 'createdBy', headerName: 'Created by' },
  { field: 'dateModified', headerName: 'Modified on' },
  { field: 'modifiedBy', headerName: 'Modified by' },
  { field: 'description',
    headerName: 'Description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row.login || ''} ${params.row.role || ''}`,
  },
];

const rows = [
  { id: 0, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 1, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 2, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 3, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 4, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 5, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 6, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 7, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 8, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
];

export default function DataTable() {
  return (
    <div style={{ height: '89vh' }}>
      <DataGrid
        style={{ display: 'flex', alignItems: 'center' }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </div>
  );
}
