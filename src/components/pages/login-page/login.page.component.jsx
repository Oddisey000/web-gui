import * as React from 'react';
import { connect } from "react-redux";
import {Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './login.page.component.scss';
import FooterComponent from '../../footer-component/footer.component';

import { storeUserInfo } from "../../../redux/app-reducer/app-reducer.actions";

const defaultTheme = createTheme();

const LoginPage = ({ appReducer, storeUserInfo }) => {
  React.useEffect(() => {console.log(appReducer.loggedInUser)});

  const logoPicture = 'assets/img/logo.png';
  const handleSubmit = (event) => {
    event.preventDefault();
    const loggedInUser = {name: document.getElementById("login").value, password: document.getElementById("password").value};
    storeUserInfo(loggedInUser);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logoPicture})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mt: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#2196f3' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
                <Typography component="h6" variant="h6"> In partnership with: </Typography>
                <Link target="_blank" href="https://www.espi-logistics.de" rel="noreferrer">
                  <img alt='ESPI logo' className='partners_logo' src="assets/img/espi.png" />
                </Link>
                <Link target="_blank" href="https://www.wentronic.com" rel="noreferrer">
                  <img alt='Wentronic logo' className='partners_logo' src="assets/img/wentronic.png" />
                </Link>
              <FooterComponent/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    appReducer: { ...state.appReducer }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserInfo: (request) => dispatch(storeUserInfo(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);