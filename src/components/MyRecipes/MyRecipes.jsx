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
// custom hook
import useStyles from '../../hooks/useStyles';

function MyRecipes() {
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

  // assigning userRecipes to sortedData allows user to sort data on the dom
  const sortedData = userRecipes.sort((a, b) => {
    if (sortType === 'date' || sortType === 'chef_grade') {
      return b[sortType] > a[sortType] ? 1 : -1;
    } else {
      return a[sortType].toUpperCase() > b[sortType].toUpperCase() ? 1 : -1;
    }
  });

  return (
    <div className="recipes-container">
      <center>
        <Typography variant="h3" color="secondary" className={classes.head}>
          MyRecipes
        </Typography>
      </center>
      <div className="sort-container">
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
          <Grid key={recipe.id} item xs={3}>
            <Card className={classes.card2}>
              <CardActionArea onClick={() => openRecipe(recipe.id)}>
                <CardMedia
                  component="img"
                  alt="recipe photo"
                  height="140"
                  image={recipe.photo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" color="secondary">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {recipe.tags}
                  </Typography>
                  {recipe.chef_grade === '0' ? null : (
                    <Typography variant="h5" color="secondary" align="right">
                      <GradeIcon />
                      {recipe.chef_grade}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MyRecipes;
