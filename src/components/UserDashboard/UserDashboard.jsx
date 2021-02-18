import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import { Typography, Button, makeStyles, Grid, Paper } from '@material-ui/core';
import './UserDashboard.css';

const useStyles = makeStyles({
  paperHead: {
    backgroundColor: '#ad4830',
    borderRadius: '3px',
    margin: '2px',
  },
  paperBody: {
    backgroundColor: '#fff4dd',
    margin: '2px',
  },
  head: {
    marginBottom: '30px'
  },
  select: {
    backgroundColor: '#fff4dd',
    border: '1px, #ad4830, solid',
    height: '30px',
    marginBottom: '30px'
  }
})

function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((state) => state.user);
  const fiveUserRecipes = useSelector(state => state.dash.fiveUserRecipes);
  const fiveAllRecipes = useSelector(state => state.dash.fiveAllRecipes)

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: 'FETCH_FIVE_FROM_ALL_RECIPES' });
    dispatch({ type: 'FETCH_FIVE_FROM_MY_RECIPES' });
  }, []);

  console.log('five from all:', fiveAllRecipes);
  console.log('five from mine:', fiveUserRecipes);
  return (
    <center className="dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" color="secondary">Welcome, Chef {user.username}!</Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperHead}>
            <Typography
              variant="h4"
              color="secondary"
            >
              My Recipes
            </Typography>
          </Paper>
          <Paper className={classes.paperBody}>
            <Typography
              variant="h6"
              color="primary"
            >
              {/* {userRecipes[0].name} */}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperHead}>
            <Typography
              variant="h4"
              color="secondary"
            >
              Recent Recipes
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </center>

  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
