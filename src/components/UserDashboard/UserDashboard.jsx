import React from 'react';
import Header from '../Header/Header';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import './UserDashboard.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);


  return (
      <div className="dashboard">
        <Header />
        
        <Typography variant="h4" color="secondary">Welcome, {user.username}!</Typography>

        <LogOutButton className="btn" />
      </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
