import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import { Typography, Button, Grid, Paper } from '@material-ui/core';
// custom hook
import useStyles from '../../hooks/useStyles';

function UserDashboard() {
  // get data from reducers
  const user = useSelector((state) => state.user);
  const fiveUserRecipes = useSelector(state => state.dash.fiveUserRecipes);
  const fiveAllRecipes = useSelector(state => state.dash.fiveAllRecipes)

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  // on load get five most recents recipes from user and everyone overall
  useEffect(() => {
    dispatch({ type: 'FETCH_FIVE_FROM_ALL_RECIPES' });
    dispatch({ type: 'FETCH_FIVE_FROM_MY_RECIPES' });
  }, []);

  const openRecipe = (id) => {
    console.log('clicked on recipe id:', id);
    history.push(`/recipeDetails/${id}`);
  }

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
