import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ConfigForm = () => {
  const [isSSPI, setSSPI] = React.useState(true);
  function HideServerAccountInput() {
    setSSPI(true);
  }
  function DisplayServerAccountInput() {
    setSSPI(false);
  }

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      //alert(file.name);
      //alert(reader.result);
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Server configuration
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="server_name"
            name="server_name"
            label="Server name"
            fullWidth
            autoComplete="Server name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel sx={{display: 'flex', paddingTop: '1rem', paddingBottom: '.5rem'}} id="demo-row-radio-buttons-group-label">
            SQL Server Authentication method:
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={"lonig&password"}
          >
            <FormControlLabel onClick={HideServerAccountInput} value="lonig&password" control={<Radio />} label="Login and password" />
            <FormControlLabel onClick={DisplayServerAccountInput} value="SSPI" control={<Radio />} label="SSPI" />
          </RadioGroup>
        </Grid>
        <>
          {isSSPI ? (
            <>
              <Grid id="server_account_name" item xs={12} sm={6}>
                <TextField
                  required
                  id="server_account_name_text"
                  name="server_account_name"
                  label="Server account name"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid id="server_account_password" item xs={12} sm={6}>
                <TextField
                  required
                  id="server_account_password_text"
                  name="server_account_password"
                  label="Server account password"
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </>
          ):(
            <>
              <Grid id="server_account_name" item xs={12} sm={6}>
                <TextField
                  disabled
                  id="server_account_name_text"
                  name="server_account_name"
                  label="Server account name"
                  fullWidth
                  variant="filled"
                />
              </Grid>
              <Grid id="server_account_password" item xs={12} sm={6}>
                <TextField
                  disabled
                  id="server_account_password_text"
                  name="server_account_password"
                  label="Server account password"
                  fullWidth
                  variant="filled"
                />
              </Grid>
            </>
          )}
        </>
        <Grid item xs={12}>
        <FormLabel sx={{display: 'flex', paddingTop: '1rem', paddingBottom: '1rem'}}>
          Please select SQL file
        </FormLabel>
          <Button sx={{display: 'flex', width: 'fit-content'}} component="label" variant="contained" startIcon={<FileUploadIcon />}>
            Upload file
            <VisuallyHiddenInput onChange={fileInputHandler} id="sql_file" type="file" />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ConfigForm;