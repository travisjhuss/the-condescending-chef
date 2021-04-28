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
    marginTop: '-29px',
  },
});

function RegisterPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="container">
      <center style={{ marginTop: '100px', marginBottom: '50px' }}>
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
