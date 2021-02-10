import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import { Button, Typography, Grid, Card, makeStyles, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';
import './MyRecipes.css';

const useStyles = makeStyles({
    card: {
        backgroundColor: '#ad4830',
        borderRadius: '3px',
        margin: '2px',
    },
    head: {
        marginBottom: '30px'
    }
})

function MyRecipes() {

    const history = useHistory();
    const dispatch = useDispatch();
    const userRecipes = useSelector(store => store.userRecipes);
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: 'FETCH_MY_RECIPES' });
        // dispatch({type: 'CLEAR_SEARCH'});
    }, []);

    console.log('userRecipes:', userRecipes);
    return (
        <div className="recipes-container">
            <center>
                <Typography variant="h3" color="secondary" className={classes.head}>MyRecipes</Typography>
            </center>
            <Grid container spacing={2}>
                {userRecipes.map((recipe) => (
                    <Grid key={recipe.id} item xs={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
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
                                    <Typography variant="body2" color="textSecondary">
                                        {recipe.tags}
                                    </Typography>
                                    <Typography variant="body2" color="secondary" align="right">
                                        {recipe.chef_grade}
                                    </Typography>
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