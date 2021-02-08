import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
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
