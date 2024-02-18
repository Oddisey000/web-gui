import * as React from 'react';
import { connect } from "react-redux";
import { CssBaseline, AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, Button, Link, Typography, } from '@mui/material';

import './configuration.page.component.scss';
import ConfigForm from './config-form/config.form.component';
import ConfigReview from './config-review/config.review.component';
import FooterComponent from '../../footer-component/footer.component';

import { storeServerConfig } from '../../../redux/app-reducer/app-reducer.actions';

// Define how many steps should be available during configuration process
const steps = ['App initialization', 'Review configuration'];

// This function controll 2 different components, intial configuration page and checkout page
function getStepContent(step) {
  switch (step) {
    case 0:
      return <ConfigForm />;
    case 1:
      return <ConfigReview />;
    default:
      throw new Error('Unknown step');
  }
}

const ConfigurationPage = ({appReducer, storeServerConfig }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  // Collect all of the data user provided during configuration process and handle switchig to the next step
  const handleNext = () => {
    if (activeStep < 1) {
      const serverConfig = {
        serverName: document.getElementById('server_name').value,
        sspi: false,
        login: document.getElementById('server_account_name_text').value,
        password: document.getElementById('server_account_password_text').value,
        sqlFileName: appReducer.configurationData.sqlFileName,
        sqlFileContent: appReducer.configurationData.sqlFileContent
      };
      storeServerConfig(serverConfig);
      setActiveStep(activeStep + 1);
    }
  };

  // Return to previous step
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          backgroundColor: '#fff'
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link target="_blank" href="https://www.leoni.com" rel="noreferrer">
                <img className='leoni_logo_config_page' alt='Leoni logo' src="assets/img/Leoni.png" />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper square sx={{
        backgroundColor: 'ghostwhite',
        width: '100%',
        minHeight: '100vh'
      }}>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper square={false} elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h6" align="center">
            Welcome to LSMG 3 configurator
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom></Typography>
              <Typography variant="subtitle1"></Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Save results' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <FooterComponent />
      </Container>
      </Paper>
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
    storeServerConfig: (request) => dispatch(storeServerConfig(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);