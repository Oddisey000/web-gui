import * as React from 'react';
import { Button, TextField } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import './normal.login.component.scss';

const switchToNFC = () => {
  document.getElementsByClassName('normal_dom_element')[0].style.display = 'none';
  document.getElementsByClassName('nfc_dom_element')[0].style.display = 'block';
}

const NormalLogin = () => {
  return(
    <React.Fragment>
      <TextField
        margin="normal"
        required
        fullWidth
        id="login"
        label="Login"
        name="login"
        autoComplete="login"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <div className='login_buttons'>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <SwapHorizIcon sx={{ mt: 3, mb: 2 }} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
          onClick={switchToNFC}
        >
          RFID/NFC
        </Button>
      </div>
    </React.Fragment>
  );
}

export default NormalLogin;