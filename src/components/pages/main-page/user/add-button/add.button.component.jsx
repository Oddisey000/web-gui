import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

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

const FloatingActionButtons = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Typography className='modal_title' variant="h6" component="h2">
                User registration
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                <Typography id="spring-modal-description" sx={{ mt: 1 }}>
                  In this modal user registration will be handled
                </Typography>
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