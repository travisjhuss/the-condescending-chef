import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, TextField } from '@material-ui/core';
// custom hook
import useStyles from '../../hooks/useStyles';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant="h5" color="primary">Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <Typography variant="body1" color="primary">Username:</Typography>
          <TextField
            className={classes.input}
            variant="filled"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <Typography variant="body1" color="primary">Password:</Typography>
          <TextField
            className={classes.input}
            variant="filled"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div style={{marginTop: "10px"}}>
        <Button type="submit" color="primary" variant="contained">
          <Typography variant="button" color="secondary">Register</Typography>
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
