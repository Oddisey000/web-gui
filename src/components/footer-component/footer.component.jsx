import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Typography, Container, Link} from '@mui/material';

import './footer.component.scss';

const defaultTheme = createTheme();

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link target="_blank" href="https://www.leoni.com" rel="noreferrer">
        Leoni
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const FooterComponent = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
          <Container className='sa' maxWidth="sm">
            <Copyright />
          </Container>
    </ThemeProvider>
  );
}

export default FooterComponent