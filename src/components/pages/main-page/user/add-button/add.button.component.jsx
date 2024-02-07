import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button, TextField } from '@mui/material';

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

const FloatingActionButtons = () => {
  const [open, setOpen] = React.useState(false);
  const [userGroup, setuserGroup] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setuserGroup(event.target.value);
  };

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
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                  <Grid container direction={"column"} spacing={4}>
                    <Grid item>
                      <InputLabel id="demo-simple-select-label">Access level</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userGroup}
                        label="Access level"
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value={5}>Operator</MenuItem>
                        <MenuItem value={4}>Quality Management</MenuItem>
                        <MenuItem value={3}>Team Leader</MenuItem>
                        <MenuItem value={2}>Technician</MenuItem>
                        <MenuItem value={1}>Process Expert</MenuItem>
                        <MenuItem value={0}>Administrator</MenuItem>
                      </Select>
                      </Grid>
                      <Grid sx={{display: 'flex'}} item>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField id="input-with-sx" label="Login" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: '3vw' }}>
                          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField id="input-with-sx" label="Password" variant="standard" />
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
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
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

export default FloatingActionButtons;