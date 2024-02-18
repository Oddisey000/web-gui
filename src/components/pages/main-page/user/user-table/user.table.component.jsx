import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { connect } from "react-redux";

import './user.table.component.scss';

const columns = [
  { field: 'ID', headerName: 'ID', width: 130, hide: true },
  { field: 'login', headerName: 'Login' },
  { field: 'Role', headerName: 'User role', width: 130 },
  { field: 'IsActive', headerName: 'Active user', width: 130 },
  { field: 'NFCcode', headerName: 'NFC/RFID code', width: 130 },
  { field: 'DateCreated', headerName: 'Created on', width: 130 },
  { field: 'CreatedBy', headerName: 'Created by', width: 130 },
  { field: 'DateModified', headerName: 'Modified on', width: 130 },
  { field: 'ModifiedBy', headerName: 'Modified by', width: 130 },
  { field: 'Description', headerName: 'Description', width: 200 },
  { field: 'button-edit', headerName: 'Edit User', width: 130,  renderCell: (params) => {
    // you will find row info in params
    return <Button variant="outlined" color="success">Edit</Button>
 } },
  { field: 'button-delete', headerName: 'Delete User', width: 130,  renderCell: (params) => {
    // you will find row info in params
    return <Button variant="outlined" color="error">Delete</Button>
  } },
];

const handleRowClick = (params) => {
  console.log(params);
}

const UserListComponent = ({ appReducer }) => {
  let rows = [];
  appReducer.userlist.map(element => {
    let obj = {
      id: element.id,
      login: element.login,
      Role: element.Role,
      IsActive: element.IsActive,
      NFCcode: element.NFCcode,
      DateCreated: element.DateCreated,
      CreatedBy: element.CreatedBy,
      DateModified: element.DateModified,
      ModifiedBy: element.ModifiedBy,
      Description: element.ModifiedBy,
    };
    rows.push(obj);
  })
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
              ID: false,
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

const mapStateToProps = (state) => {
  return {
    appReducer: { ...state.appReducer }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);