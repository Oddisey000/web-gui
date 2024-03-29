import * as React from 'react';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Button, TextField, Backdrop, Box, Modal, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';

import './normal.login.component.scss';

import { storeUserInfo, storeUserList, getUserGroupList } from '../../../../redux/app-reducer/app-reducer.actions';

// A variable which represent different error messages in modal window
let modalErrorMsg = '';

// If user chouse to loggin with NFC from modal error window, this function will hide login and password inputs
const switchToNFC = () => {
  document.getElementsByClassName('normal_dom_element')[0].style.display = 'none';
  document.getElementsByClassName('nfc_dom_element')[0].style.display = 'block';
}

// A modal related styles and settings
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

const NormalLogin = ({ appReducer, storeUserInfo, storeUserList, getUserGroupList }) => {
  React.useEffect(() => {HandleRedirect()});

  // Initial state of error modal window
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // If during error user chouse to login with NFC, this function will hide normal login method and display NFC login
  const HandleModalButton = () => {
    handleClose();
    switchToNFC();
    setTimeout(() => {
      document.getElementById('nfc_input').focus();
    }, 100);
  }

  // During login process this function check if login was successfull and load data of registered users into application state
  const HandleRedirect = () => {
    var interval = setInterval(doStuff, 100);
    function doStuff() {
      if (appReducer.loggedInUser.name) {
        storeUserList(`${appReducer.API_url}getuserlist`);
        getUserGroupList(`${appReducer.API_url}getusergrouplist`);
        if (appReducer.userlist) {
          clearInterval(interval)
          setTimeout(() => {
            navigate('main');
          }, 100);
        }
      }
    }
  }

  // Taking inserted data from corresponded fields and inform user with modal window in case of errors
  const HandleLogin = () => {
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

    // Handle configuration page redirection if specific login and password provided
    // Additionaly handle error message if user provide non existing credentials
    const serviceAccount = {name: 'service', password: 'init'};
    if (login !== '' && password !== '') {
      if (login === serviceAccount.name && password === serviceAccount.password) {
        navigate('config');
      }
      storeUserInfo(`${appReducer.API_url}authentication?login=${login}&password=${password}`);
      setTimeout(() => {
        if (!appReducer.loggedInUser.name) {
          modalErrorMsg = '';
          modalErrorMsg += 'Your login or password incorrect';
          handleOpen();
        }
      }, 10000);
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
              </Typography>
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
        defaultValue={''}
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
          onClick={HandleLogin}
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

// A few function below are necessary for redux implementation
const mapStateToProps = (state) => {
  return {
    appReducer: { ...state.appReducer }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserInfo: (request) => dispatch(storeUserInfo(request)),
    storeUserList: (request) => dispatch(storeUserList(request)),
    getUserGroupList: (request) => dispatch(getUserGroupList(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLogin);