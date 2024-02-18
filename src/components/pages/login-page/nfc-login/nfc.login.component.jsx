import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Hide NFC type of loggin and display login and password form
const switchToNormal = () => {
  document.getElementsByClassName('normal_dom_element')[0].style.display = 'block';
  document.getElementsByClassName('nfc_dom_element')[0].style.display = 'none';
}

// Styles of NFC button
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
  '&:hover': {
    backgroundColor: deepOrange[700],
  },
}));

const NFCLogin = () => {
  return(
    <React.Fragment>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nfc_input"
        label="Scann RFID/NFC"
        name="nfc"
        inputRef={input => input && input.focus()}
      />
      <div className='login_buttons'>
        <ColorButton
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          onClick={switchToNormal}
        >
          <ArrowBackIcon />
        </ColorButton>
      </div>
    </React.Fragment>
  );
}

export default NFCLogin;