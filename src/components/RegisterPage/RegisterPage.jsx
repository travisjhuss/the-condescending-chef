import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Typography, Button } from '@material-ui/core';

function RegisterPage() {
  const history = useHistory();

  return (
    <div style={{marginTop: '200px'}}>
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
