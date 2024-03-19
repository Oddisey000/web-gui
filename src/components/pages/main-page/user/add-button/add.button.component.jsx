import * as React from 'react';
import { connect } from "react-redux";
import { Box, Fab, Modal, Backdrop, Typography, InputLabel, MenuItem, FormControl, Select, Grid, Button, TextField } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

import { createNewUser } from '../../../../../redux/app-reducer/app-reducer.actions';

// Modal window initial parameters
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
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '.5rem',
  boxShadow: 24,
  p: 4,
};

const FloatingActionButtons = ({ createNewUser, ...props }) => {
  // Handle modal window state
  const [open, setOpen] = React.useState(false);
  const [userGroup, setuserGroup] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setuserGroup(event.target.value);
  };

  const HandleSubmit = () => {
    const login = document.getElementById('add-modal-login').value
    const password = document.getElementById('add-modal-password').value
    const nfc = document.getElementById('NFC/RFID_field_registration').value
    const description = document.getElementById('description_field_registration').value

    createNewUser(`${props.API_url}updateUserData?data=${'\\' + login + '/' + password + '/' + nfc + '/' + description + '/' + userGroup + '/' + props.loggedInUser.name}`);
    handleClose()
  }

  return (
    <React.Fragment>
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
              <Typography sx={{color: 'brown'}} className='modal_title' variant="h6" component="h2">
                REGISTRATION:
              </Typography>
              <Typography component={'span'} id="spring-modal-description" sx={{ mt: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                  <Grid container direction={"column"} spacing={4}>
                    <Grid item>
                      <InputLabel id="demo-simple-select-label">Access level</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="add-modal-select"
                        value={userGroup}
                        label="Access level"
                        onChange={handleChange}
                        fullWidth
                      >
                        {props.userGroupList.map(data => {
                          return(<MenuItem key={data.RoleID} value={data.RoleID}>{data.Description}</MenuItem>)
                        })}
                      </Select>
                      </Grid>
                      <Grid sx={{display: 'flex'}} item>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField id="add-modal-login" label="Login" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: '3vw' }}>
                          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField id="add-modal-password" label="Password" variant="standard" />
                        </Box>
                      </Grid>
                      <Grid item>
                        <TextField id="NFC/RFID_field_registration" fullWidth label="Scan NFC/RFID code" color="secondary" />
                      </Grid>
                      <Grid item>
                        <TextField id="description_field_registration" fullWidth label="Description" variant='filled' />
                      </Grid>
                      <Grid item>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={HandleSubmit}
                      >
                        ADD USER
                      </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Box>
              </Typography>
            </Box>
        </Fade>
      </Modal>
          <Box sx={{ '& > :not(style)': { m: 1 }, position: 'absolute', right: '3vw', bottom: '8vh' }}>
            <Fab onClick={handleOpen} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
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
    createNewUser: (request) => dispatch(createNewUser(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FloatingActionButtons);