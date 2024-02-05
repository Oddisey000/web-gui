import * as React from 'react';
import { connect } from "react-redux";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ConfigReview = ({ appReducer }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Configuration summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Server name' secondary='name of the server' />
          <Typography variant="body2">{appReducer.configurationData.serverName}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='SSPI' secondary='connection type' />
          <Typography variant="body2">{appReducer.configurationData.sspi ? "True" : "False"}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Login' secondary='database user login' />
          <Typography variant="body2">{appReducer.configurationData.login}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Password' secondary='database user password' />
          <Typography variant="body2">{appReducer.configurationData.password}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='SQL file' secondary='Selected SQL file' />
          <Typography variant="body2">{appReducer.configurationData.sqlFileName}</Typography>
        </ListItem>
      </List>
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigReview);