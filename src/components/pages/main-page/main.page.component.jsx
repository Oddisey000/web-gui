import * as React from 'react';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar, Typography, IconButton, Grid, Paper, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EngineeringIcon from '@mui/icons-material/Engineering';

import Chart from './chart/chart.component';
import Orders from './order/order.component';
import UserComponent from './user/user.component';
import MaintenanceComponent from './maintenance/maintenance.component';

import { storeUserInfo, storeUserList } from '../../../redux/app-reducer/app-reducer.actions';

// Styling properties of App drawer (right navigation bar)
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

const MainPage = ({ appReducer, storeUserInfo, storeUserList }) => {
  // Define starting point based on user account role level
  const startComponent = () => {
    switch(appReducer.loggedInUser.role) {
      case 0: 
        return 1;
      case 1: 
        return 0;
      case 2: 
        return 2;
      case 3: 
        return 1;
      case 4: 
        return 0;
      case 5: 
        return 0;
      default: 
        return 0;
    }
  };

  const [drawerState, setdrawerState] = React.useState(startComponent);
  const navigate = useNavigate();

  // Default elements on the main page + additional routes like maintenance and user management
  const BodyElement = () => {
    switch (drawerState) {
      case 0:
        return(
          <Grid padding={(1)} container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        );
      case 1:
        return(<UserComponent />)
      case 2:
        return(<MaintenanceComponent />)
      default:
        return(<></>)
    }
  }

  // Array of function which help application to navigate betwwen different tabs (maintenance, user, etc)
  function HandleMain() {
    setdrawerState(0);
  }
  function HandleMaintenance() {
    setdrawerState(2);
  }
  function HandleUser() {
    setdrawerState(1);
  }

  // Reset logged in user info and redirect user to the main page
  function HandleLogOut() {
    storeUserInfo({name: '', role: ''});
    navigate('/');
  }

  // Hide drawer when page loaded
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // Open drawer event controls
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Drawer list component with all of the routes
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem onClick={HandleMain} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={HandleUser} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary={'ManageAccounts'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={HandleMaintenance} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EngineeringIcon />
            </ListItemIcon>
            <ListItemText primary={'Maintenance'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', zIndex: '99', width: '100vw' }}>
        <CssBaseline />
        <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        sx={{zIndex: '100'}}
      >
        {list('left')}
      </Drawer>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton onClick={HandleLogOut} color="inherit">
                <LockOpenIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            minWidth: '100vw%'
          }}
        >
          <Toolbar />
          <BodyElement />
        </Box>
      </Box>
    </ThemeProvider>
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
    storeUserList: (request) => dispatch(storeUserList(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);