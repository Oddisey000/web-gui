import * as React from 'react';
import { connect } from "react-redux";
import { Box, Modal, Backdrop, Typography, InputLabel, MenuItem, FormControl, Select, Grid, Button, TextField } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

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

const EditButtonComponent = ({ appReducer, ...params }) => {
  // Handle modal window state
  const [open, setOpen] = React.useState(false);
  const [userGroup, setuserGroup] = React.useState(params.row.Role);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setuserGroup(event.target.value);
  };

  const HandleEdit = () => {
    const accessLevel = document.getElementById('edit-modal-select').value
    const login = document.getElementById('edit-modal-login').value
    const password = document.getElementById('edit-modal-password').value
    const nfc = document.getElementById('edit-modal-nfc').value
    const description = document.getElementById('edit-modal-description').value

    console.log(password)
    
    const index = appReducer.userlist.findIndex(row => row.id == params.id);
    appReducer.userlist[index].accessLevel = accessLevel;
    appReducer.userlist[index].login = login;
    appReducer.userlist[index].NFCcode = nfc;
    appReducer.userlist[index].Role = userGroup;
    appReducer.userlist[index].Description = description;

    handleClose()
  }

  const LoadUserData = () => {
    handleOpen()
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
              <Typography sx={{color: '#2e7d32'}} className='modal_title' variant="h6" component="h2">
                EDIT USER DATA:
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                  <Grid container direction={"column"} spacing={4}>
                    <Grid item>
                      <InputLabel id="demo-simple-select-label">Access level</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="edit-modal-select"
                        defaultValue={userGroup}
                        label="Access level"
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value={'Operator'}>Operator</MenuItem>
                        <MenuItem value={'Quality Management'}>Quality Management</MenuItem>
                        <MenuItem value={'Team Leader'}>Team Leader</MenuItem>
                        <MenuItem value={'Technician'}>Technician</MenuItem>
                        <MenuItem value={'Process Expert'}>Process Expert</MenuItem>
                        <MenuItem value={'Administrator'}>Administrator</MenuItem>
                      </Select>
                      </Grid>
                      <Grid sx={{display: 'flex'}} item>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField defaultValue={params.row.login} id="edit-modal-login" label="Login" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: '3vw' }}>
                          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField id="edit-modal-password" label="Password" variant="standard" />
                        </Box>
                      </Grid>
                      <Grid item>
                        <TextField defaultValue={params.row.NFCcode} id="edit-modal-nfc" fullWidth label="Scan NFC/RFID code" color="secondary" />
                      </Grid>
                      <Grid item>
                        <TextField defaultValue={params.row.Description} id="edit-modal-description" fullWidth label="Description" variant='filled' />
                      </Grid>
                      <Grid item>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={HandleEdit}
                      >
                        Apply changes
                      </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Box>
              </Typography>
            </Box>
        </Fade>
      </Modal>
        <Button onClick={LoadUserData} variant="outlined" color="success">Edit</Button>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditButtonComponent);