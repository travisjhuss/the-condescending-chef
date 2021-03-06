import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
//custom hook
import useStyles from '../../hooks/useStyles';

function HardTruth() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userRecipes = useSelector((store) => store.userRecipes);
  const classes = useStyles();

  const [sortType, setSortType] = useState('date');

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_RECIPES' });
  }, []);

  const openRecipe = (id) => {
    console.log('clicked on recipe id:', id);
    history.push(`/recipeDetails/${id}`);
  };

  // assign userRecipes to sortedData for sorting on the DOM
  const sortedData = userRecipes.sort((a, b) => {
    if (sortType === 'date' || sortType === 'chef_grade') {
      return b[sortType] > a[sortType] ? 1 : -1;
    } else {
      return a[sortType].toUpperCase() > b[sortType].toUpperCase() ? 1 : -1;
    }
  });

  return (
    <div className="ht-container">
      <center>
        <Typography variant="h3" color="secondary" className={classes.head}>
          The Hard Truth
        </Typography>
      </center>
      <div className="ht-sort-container">
        <Typography variant="body2" color="secondary" display="inline">
          Sort by:{' '}
        </Typography>
        <select
          value={sortType}
          className="sort-select"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="name">Name</option>
          <option value="chef_grade">Grade</option>
        </select>
      </div>
      <Grid container spacing={2}>
        {sortedData.map((recipe) => (
          <>
            {recipe.chef_grade !== '0' && (
              <Grid key={recipe.id} item xs={12}>
                <Card className={classes.card}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <CardActionArea onClick={() => openRecipe(recipe.id)}>
                        <CardContent>
                          <Typography
                            display="inline"
                            variant="h5"
                            color="secondary"
                          >
                            {recipe.name}
                          </Typography>
                          <br />
                          <CardMedia
                            component="img"
                            alt="recipe photo"
                            height="140"
                            image={recipe.photo}
                          />
                        </CardContent>
                      </CardActionArea>
                    </Grid>
                    <Grid item xs={8}>
                      <CardContent className={classes.feedback}>
                        <Typography variant="h5" color="primary" align="left">
                          Chef Score: <GradeIcon />
                          {recipe.chef_grade}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {recipe.chef_feedback}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </div>
  );
}

export default HardTruth;
