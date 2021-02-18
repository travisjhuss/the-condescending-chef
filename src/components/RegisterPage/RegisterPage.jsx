import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
// MUI
import { Typography, Button, makeStyles } from '@material-ui/core';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  logo: {
    color: '#94836d',
    fontSize: '150px',
    position: 'absolute',
    marginLeft: '-70px',
    marginTop: '-29px'
  },
})

function RegisterPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <center style={{ marginTop: '100px', marginBottom: '50px' }}>
        <div className="logo">
          <LocalDiningIcon className={classes.logo} />
        </div>
        <div className="title">
          <Typography color="secondary" variant="h6" style={{ fontWeight: '500' }}>The</Typography>
          <Typography color="secondary" variant="h4" style={{ fontWeight: '500' }}>Condescending</Typography>
          <Typography color="secondary" variant="h6" style={{ fontWeight: '500' }}>Chef</Typography>
        </div>
      </center>
      <center>
        <RegisterForm />

        <Button
          color="secondary"
          onClick={() => {
            history.push('/login');
          }}
        >
          <Typography variant="subtitle2">Login</Typography>
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
