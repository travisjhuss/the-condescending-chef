import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// MUI
import {
    Button, Typography,
    Grid, Paper,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#fff4dd',
        margin: 'auto',
        padding: '10px',
        overflow: 'scroll'
    },
    container: {
        margin: "100px 75px"
    },
})

function AdminFeedbackPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DETAILS', payload: id });
        dispatch({ type: 'FETCH_RECIPE_INGREDIENTS', payload: id });
    }, [id]);

    const recipeDetails = useSelector(state => state.details.recipeDetails);
    const recipeIngredients = useSelector(state => state.details.recipeIngredients);

    console.log('adminfeedbackpage:', recipeDetails, recipeIngredients);
    return (
        <div class={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <img src={recipeDetails.photo} width="250" />
                </Grid>
                <Grid item xs={6}>
                    <Typography>Feedback</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography display="inline" color="secondary" variant="h5" >{recipeDetails.name}</Typography>
                    <Typography color="secondary" variant="subtitle1">From user:{' '}{recipeDetails.user_id}</Typography>
                    <Typography variant="caption" color="secondary">
                        {recipeDetails.tags}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Feedback</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="secondary">
                        Ingredients:
                    </Typography>
                    <br />
                    {recipeIngredients.map((ingredient, i) => {
                        return (
                            <Typography key={i} color="primary">
                                &#183;{' '}{ingredient.amount} {ingredient.unit} {ingredient.name}
                            </Typography>
                        )
                    })}
                </Grid>
                <Grid item xs={6}>
                    <Typography>Feedback</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="secondary">
                        Instructions:
                    </Typography>
                    <Typography color="primary">{recipeDetails.description}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminFeedbackPage;