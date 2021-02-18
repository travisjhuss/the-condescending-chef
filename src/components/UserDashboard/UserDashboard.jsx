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
    padding: '5px',
    width: '400px'
  },
  paperBody: {
    backgroundColor: '#fff4dd',
    padding: '5px',
    width: '400px'
  },
  head: {
    marginBottom: '30px'
  },
  button: {
    textTransform: 'none'
  },
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

  const openRecipe = (id) => {
    console.log('clicked on recipe id:', id);
    history.push(`/recipeDetails/${id}`);
  }

  console.log('five from all:', fiveAllRecipes);
  console.log('five from mine:', fiveUserRecipes);
  return (
    <center className="dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" color="secondary">Welcome, Chef {user.username}!</Typography>
          <hr className="line-break" />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="secondary"
            style={{fontStyle: 'italic'}}
          >
            “A recipe has no soul. You, as the cook, must bring soul to the recipe.”
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary"
          >
            - Thomas Keller
          </Typography>
          <hr className="line-quote" />
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
            {fiveUserRecipes.map((recipe) => {
              return (
                <>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => openRecipe(recipe.id)}
                  >
                    <Typography variant="h6">{recipe.name}</Typography>
                  </Button>
                  <hr className="line-break" />
                </>
              )
            })}
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
          <Paper className={classes.paperBody}>
            {fiveAllRecipes.map((recipe) => {
              return (
                <>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => openRecipe(recipe.id)}
                  >
                    <Typography variant="h6">{recipe.name}</Typography>
                  </Button>
                  <hr className="line-break" />
                </>
              )
            })}
          </Paper>
        </Grid>
      </Grid>
    </center>

  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
