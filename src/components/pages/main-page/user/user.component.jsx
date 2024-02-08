import * as React from 'react';

import UserListComponent from './user-table/user.table.component';
import AddButtonComponent from './add-button/add.button.component';

const UserComponent = () => {
  return (
    <React.Fragment>
      <UserListComponent />
      <AddButtonComponent />
    </React.Fragment>
  );
}

export default UserComponent