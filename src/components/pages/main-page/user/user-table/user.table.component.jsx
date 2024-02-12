import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import './user.table.component.scss';

const columns = [
  { field: 'id', headerName: 'ID', width: 130, hide: true },
  { field: 'login', headerName: 'Login' },
  { field: 'role', headerName: 'User role', width: 130 },
  { field: 'isActive', headerName: 'Active user', width: 130 },
  { field: 'nfcCode', headerName: 'NFC/RFID code', width: 130 },
  { field: 'dateCreated', headerName: 'Created on', width: 130 },
  { field: 'createdBy', headerName: 'Created by', width: 130 },
  { field: 'dateModified', headerName: 'Modified on', width: 130 },
  { field: 'modifiedBy', headerName: 'Modified by', width: 130 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'button-edit', headerName: 'Edit User', width: 130,  renderCell: (params) => {
    // you will find row info in params
    return <Button variant="outlined" color="success">Edit</Button>
 } },
  { field: 'button-delete', headerName: 'Delete User', width: 130,  renderCell: (params) => {
    // you will find row info in params
    return <Button variant="outlined" color="error">Delete</Button>
  } },
];

const rows = [
  { id: 0, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 1, login: 'movi5001', role: 'Operator', isActive: 'Yes', nfcCode: '437291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Antony KM44'},
  { id: 2, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 3, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 4, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 5, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 6, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 7, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
  { id: 8, login: 'pevi5001', role: 'Administrator', isActive: 'Yes', nfcCode: '427291', dateCreated: '08.05.2024', createdBy: 'pevi5001', dateModified: '', modifiedBy: '', description: 'Vitalii KM45'},
];

const handleRowClick = (params) => {
  console.log(params);
}

export default function DataTable() {
  return (
    <div style={{ height: '89vh' }}>
      <DataGrid
        style={{ display: 'flex', alignContent: 'stretch' }}
        rows={rows}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              id: false,
            },
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        sx={{ m: 2, '& .MuiDataGrid-columnHeaders': {textShadow: '0 0 black', backgroundColor: "antiquewhite" } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
