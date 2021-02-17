import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import './UserDashboard.css';

function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);


  return (

    <div className="dashboard">
    

      <Typography variant="h4" color="secondary">Welcome, Chef {user.username}!</Typography>

    
    </div>

  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
