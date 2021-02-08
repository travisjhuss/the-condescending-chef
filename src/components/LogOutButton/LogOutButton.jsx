import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';

function LogOutButton() {
  const dispatch = useDispatch();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      variant="contained"
      color="primary"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <Typography variant="button" color="secondary">Log Out</Typography>
    </Button>
  );
}

export default LogOutButton;
