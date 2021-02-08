import React from 'react';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Button, Drawer, AppBar } from '@material-ui/core';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // state for drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <Router>
      <div className="container">
        <AppBar position="fixed" id="">
          <Header toggleDrawer={toggleDrawer} />
        </AppBar>
        <Typography variant="h4" color="secondary">Welcome, {user.username}!</Typography>

        <LogOutButton className="btn" />

        <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer()}>
          <Nav />
        </Drawer>
      </div>
    </Router>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
