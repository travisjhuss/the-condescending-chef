import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// Material UI imports
import { Typography, Button } from '@material-ui/core';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {

  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <Typography variant="h4" color="secondary">Welcome to </Typography>
          <Typography variant="h3" color="secondary">The Condescending Chef</Typography>
          <br />
          <Typography variant="body1" color="secondary">
            Think of it as your own personal Gordon Ramsey. An online
            community and database of recipes reviewed by real chefs giving you
            the feedback you seek.
          </Typography>
          <br />
          <Typography variant="body1" color="secondary">
            Drawing from decades of real restaurant experience, our chefs will take
            the time to dig through the recipe and give feedback. Feedback can include
            not just a review of a given recipe but also tips to make it better or
            certain substitutions to consider. With the "The Condescending Chef"
            you'll get the hard truth and come out a better cook able to tackle any
            challenge in your kitchen.
        </Typography>
        </div>
        <div className="grid-col grid-col_4">
          <center>
            <RegisterForm />
          </center>
          <center>
            <Typography variant="h6" color="secondary">Already a Member?</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={onLogin}
            >
              <Typography variant="button" color="secondary">Login</Typography>
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
