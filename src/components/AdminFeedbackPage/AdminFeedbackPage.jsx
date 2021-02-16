import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// MUI
import {
    Button, Typography,
    Grid, Paper,
    makeStyles, TextField
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
    input: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#94836d',
            },
            '&:hover fieldset': {
                borderColor: ' #ad4830',
                border: '#a0432c 4px solid',
            }
        },
        backgroundColor: '#fff4dd',
        borderRadius: '3px',
        border: '#a0432c 2px solid',
        margin: '2px'
    }
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

    const [recipeFeedback, setRecipeFeedback] = useState('');
    const [recipeScore, setRecipeScore] = useState('');

    const submitFeedback = () => {
        console.log('recipeFeedback:', recipeFeedback);
        console.log('recipeScore:', recipeScore);
    }

    return (
        <div class={classes.container}>
            <Grid container spacing={4}>
                <Grid item xs={6} container spacing={2}>
                    <Grid item xs={12}>
                        <img src={recipeDetails.photo} width="250" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="secondary" variant="h5" >{recipeDetails.name}</Typography>
                        <Typography color="secondary" variant="subtitle1">From user:{' '}{recipeDetails.user_id}</Typography>
                        <Typography variant="caption" color="secondary">
                            {recipeDetails.tags}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <Typography variant="h6" color="secondary">
                            Instructions:
                        </Typography>
                        <Typography color="primary">{recipeDetails.description}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography color="secondary" variant="h5">Chef Feedback Form</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="secondary" display="inline">Score:{' '}</Typography>
                        <select 
                            value={recipeScore} 
                            className="sort-select" 
                            onChange={(e) => setRecipeScore(e.target.value)}
                        >
                            <option></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <TextField
                            variant="filled"
                            label="Notes here"
                            multiline
                            rows={20}
                            style={{ width: '350px' }}
                            className={classes.input}
                            value={recipeFeedback}
                            onChange={(event) => setRecipeFeedback(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <center>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={submitFeedback}
                            >
                                <Typography color="secondary">Submit</Typography>
                            </Button>
                        </center>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminFeedbackPage;