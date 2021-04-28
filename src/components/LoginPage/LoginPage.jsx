import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
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

function LoginPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="container">
      <center style={{ marginTop: '100px', marginBottom: '50px' }}>
        <LoginForm />

        <Button
          color="secondary"
          onClick={() => {
            history.push('/registration');
          }}
        >
          <Typography variant="subtitle2">Register</Typography>
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
