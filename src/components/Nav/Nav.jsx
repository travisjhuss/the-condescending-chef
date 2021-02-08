import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import { Typography, Button } from '@material-ui/core';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    
      <div className="drawer">
        <Link to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
        <br/>
        <Link to="/about">
          About
        </Link>
        <br/>
        {user.id && (
          <>
            <Link to="/info">
              Info Page
            </Link>
            <br/>
            <LogOutButton />
          </>
        )}
      </div>
    
  );
}

export default Nav;
