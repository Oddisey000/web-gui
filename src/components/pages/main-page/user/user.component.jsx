import * as React from 'react';

import AddButtonComponent from './add-button/add.button.component';
const UserComponent = () => {
  return (
    <React.Fragment>
      <h1>Hello User</h1>
      <AddButtonComponent />
    </React.Fragment>
  );
}

export default UserComponent