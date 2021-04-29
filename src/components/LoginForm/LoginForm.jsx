import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Button, TextField } from '@material-ui/core';
// custom hook
import useStyles from '../../hooks/useStyles';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/user');
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <center>
        <Typography variant="h5" color="primary">Login</Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
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
              required
              value={username}
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
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div style={{marginTop: "10px"}}>
          <Button type="submit" color="primary" variant="contained">
            <Typography variant="button" color="secondary">Log In</Typography>
          </Button>
        </div>
      </center>
    </form>
  );
}

export default LoginForm;
