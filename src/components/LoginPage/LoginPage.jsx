import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
// MUI
import { Typography, Button } from '@material-ui/core';

function LoginPage() {
  const history = useHistory();

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
