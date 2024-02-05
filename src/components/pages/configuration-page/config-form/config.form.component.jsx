import * as React from 'react';
import { connect } from "react-redux";
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

import { storeServerConfig } from '../../../../redux/app-reducer/app-reducer.actions';


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

const ConfigForm = ({ appReducer, storeServerConfig }) => {
  const [isSSPI, setSSPI] = React.useState(appReducer.configurationData.sspi);
  function HideServerAccountInput() {
    setSSPI(false);
  }
  function DisplayServerAccountInput() {
    setSSPI(true);
  }

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      //alert(file.name);
      //alert(reader.result);
      const serverConfig = {
        serverName: document.getElementById('server_name').value,
        sspi: false,
        login: document.getElementById('server_account_name_text').value,
        password: document.getElementById('server_account_password_text').value,
        sqlFileName: file.name,
        sqlFileContent: reader.result
      };
      storeServerConfig(serverConfig);
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
            defaultValue={appReducer.configurationData.serverName}
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
            defaultValue={appReducer.configurationData.sspi ? "SSPI" : "lonig&password"}
          >
            <FormControlLabel onClick={HideServerAccountInput} value="lonig&password" control={<Radio />} label="Login and password" />
            <FormControlLabel onClick={DisplayServerAccountInput} value="SSPI" control={<Radio />} label="SSPI" />
          </RadioGroup>
        </Grid>
        <>
          {isSSPI === false ? (
            <>
              <Grid id="server_account_name" item xs={12} sm={6}>
                <TextField
                  required
                  id="server_account_name_text"
                  name="server_account_name"
                  label="Server account name"
                  fullWidth
                  variant="standard"
                  defaultValue={appReducer.configurationData.login}
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
                  defaultValue={appReducer.configurationData.password}
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
          <Button 
            sx={{display: 'flex', width: 'fit-content'}} 
            component="label" 
            variant="contained" 
            startIcon={<FileUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput onChange={fileInputHandler} id="sql_file" type="file" />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ConfigForm);