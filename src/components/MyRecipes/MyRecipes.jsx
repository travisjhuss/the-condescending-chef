import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import {
    Button, Typography,
    Grid, Card,
    makeStyles, CardActionArea,
    CardActions, CardContent,
    CardMedia
} from '@material-ui/core';
import './MyRecipes.css';

const useStyles = makeStyles({
    card: {
        backgroundColor: '#ad4830',
        borderRadius: '3px',
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

function MyRecipes() {

    const history = useHistory();
    const dispatch = useDispatch();
    const userRecipes = useSelector(store => store.userRecipes);
    const classes = useStyles();

    const [sortType, setSortType] = useState('date');

    useEffect(() => {
        dispatch({ type: 'FETCH_MY_RECIPES' });
    }, []);

    const openRecipe = (id) => {
        console.log('clicked on recipe id:', id);
        history.push(`/recipeDetails/${id}`);
    }

    // console.log('userRecipes:', userRecipes);
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
                <Typography variant="h3" color="secondary" className={classes.head}>MyRecipes</Typography>
            </center>
            <div className="sort-container">
                <Typography variant="body2" color="secondary" display="inline">Sort by:{' '}</Typography>
                <select value={sortType} className="sort-select" onChange={(e) => setSortType(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="chef_grade">Grade</option>
                </select>
            </div>
            <Grid container spacing={2}>
                {sortedData.map((recipe) => (
                    <Grid key={recipe.id} item xs={3}>
                        <Card className={classes.card}>
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
                                    {recipe.chef_grade === '0'
                                        ? null
                                        : <Typography variant="h5" color="secondary" align="right">
                                            {recipe.chef_grade}
                                        </Typography>}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default MyRecipes;