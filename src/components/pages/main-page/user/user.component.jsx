import * as React from 'react';

import UserListComponent from './user-table/user.table.component';
import AddButtonComponent from './add-button/add.button.component';

const UserComponent = ({ ...props }) => {
  return (
    <React.Fragment>
      <UserListComponent { ...props } />
      <AddButtonComponent />
    </React.Fragment>
  );
}

export default UserComponent