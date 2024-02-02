import * as React from 'react';
import parse from 'html-react-parser';
import { Button, TextField } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

import './normal.login.component.scss';

let modalErrorMsg = '';

const switchToNFC = () => {
  document.getElementsByClassName('normal_dom_element')[0].style.display = 'none';
  document.getElementsByClassName('nfc_dom_element')[0].style.display = 'block';
}

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid red',
  borderRadius: '.5rem',
  boxShadow: 24,
  p: 4,
};

const NormalLogin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const HandleModalButton = () => {
    handleClose();
    switchToNFC();
    setTimeout(() => {
      document.getElementById('nfc_input').focus();
    }, 100);
  }

  const logginErrorMsg = () => {
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let nfc = document.getElementById('nfc_input').value;

    if (nfc === '') {
      modalErrorMsg = '';
      if (login === '' || password === '') {
        if (login === '') { modalErrorMsg += 'Please provide login'; }
        if (password === '') { modalErrorMsg += '<br>Please provide password'; }
        handleOpen();
      }
    }
  }

  return(
    <React.Fragment>
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="spring-modal-title" className='modal_title' variant="h6" component="h2">
                Login failed
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                {parse(modalErrorMsg)} 
                <Typography id="spring-modal-description" sx={{ mt: 1 }}>
                  Consider using:
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
                  onClick={HandleModalButton}
                  >
                  RFID/NFC
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
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
          onClick={logginErrorMsg}
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