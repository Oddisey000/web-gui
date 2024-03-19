import * as React from 'react';
import { connect } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import './user.table.component.scss';

import EditButtonComponent from '../edit-button/edit.button.component';

import { DeleteUser } from '../../../../../redux/app-reducer/app-reducer.utils';

const UserListComponent = ({ ...props }) => {
  React.useEffect(() => {});
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Setup table's columns parameters and buttons
  const columns = [
    { field: 'ID', headerName: 'ID', hide: true },
    { field: 'login', headerName: 'Login' },
    { field: 'RoleID', headerName: 'User role', width: 130 },
    { field: 'IsActive', headerName: 'Active user' },
    { field: 'NFCcode', headerName: 'NFC/RFID code', width: 120 },
    { field: 'DateCreated', headerName: 'Created on', width: 100 },
    { field: 'CreatedBy', headerName: 'Created by', width: 100 },
    { field: 'DateModified', headerName: 'Modified on', width: 100 },
    { field: 'ModifiedBy', headerName: 'Modified by', width: 100 },
    { field: 'Description', headerName: 'Description', width: 200 },
    { field: 'button-edit', headerName: 'Edit User', width: 110,  renderCell: (params) => {
      // you will find row info in params
      return <EditButtonComponent {...params} />
  } },
    { field: 'button-delete', headerName: 'Delete User', width: 110,  renderCell: (params) => {
      // you will find row info in params
      return <Button variant="outlined" color="error">Delete</Button>
    } },
  ];
  
  // Generate rows based on data from application state
  let rows = [];
  props.userlist.map(element => {
    let obj = {
      id: element.id,
      login: element.login,
      Role: element.RoleID,
      IsActive: element.IsActive,
      NFCcode: element.NFCcode,
      DateCreated: element.DateCreated,
      CreatedBy: element.CreatedBy,
      DateModified: element.DateModified,
      ModifiedBy: element.ModifiedBy,
      Description: element.Description,
      AccessLevel: element.AccessLevel
    };
    rows.push(obj);
    return rows;
  })

  const handleRowClick = (params) => {
    //appReducer.userlist.splice(params.id - 1, 1);
    forceUpdate();
  }

  const HandleButtons = (params) => {
    if (params.field === 'button-edit') {
      //alert('You clicked edit button')
      forceUpdate();
    }
    if (params.field === 'button-delete') {
      const index = rows.findIndex(row => row.id === params.id);
      DeleteUser(params.id)
      props.userlist.splice(index, 1);
      forceUpdate();
    }
  }

  if (props.userlist.length < 1) {
    setTimeout(() => {
      forceUpdate()
    }, 1000);
  }

  return (
    <div style={{ height: '89vh' }}>
      <DataGrid
        style={{ display: 'flex', alignContent: 'stretch' }}
        rows={rows}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide column ID, the other columns will remain visible
              ID: false,
            },
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        sx={{ m: 2, '& .MuiDataGrid-columnHeaders': {textShadow: '0 0 black', backgroundColor: "antiquewhite" } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onRowClick={handleRowClick}
        onCellClick={HandleButtons}
      />
    </div>
  );
}

// A few function below are necessary for redux implementation
const mapStateToProps = (state) => {
  return {
    appReducer: { ...state.appReducer }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);