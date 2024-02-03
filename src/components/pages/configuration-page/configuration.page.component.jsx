import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ConfigForm from './config-form/config.form.component';
import ConfigReview from './config-review/config.review.component';

import FooterComponent from '../../footer-component/footer.component';

import './configuration.page.component.scss';

const steps = ['App initialization', 'Review configuration'];

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

const ConfigurationPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

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
        backgroundColor: 'ghostwhite'
      }}>
      <Container maxWidth={true} component="main" sx={{ mb: 4 }}>
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
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
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
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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

export default ConfigurationPage;