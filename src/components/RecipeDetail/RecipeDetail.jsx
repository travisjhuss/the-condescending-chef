import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// MUI
import {
    Button, Typography,
    Grid, Paper,
    makeStyles, IconButton
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import './RecipeDetail.css';

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#ad4830',
        width: '800px',
        margin: 'auto',
    },
    button: {
        marginRight: '30px',
    },
})

function RecipeDetail() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    const recipeDetails = useSelector(state => state.details.recipeDetails);
    const recipeIngredients = useSelector(state => state.details.recipeIngredients);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DETAILS', payload: id });
        dispatch({ type: 'FETCH_RECIPE_INGREDIENTS', payload: id });
    }, []);

    const goBack = () => {
        history.goBack();
    } 

    console.log('recipeDetails:', recipeDetails);
    console.log('recipeIngredients:', recipeIngredients);
    return (
        <div className="recipe-container">
            <div className="recipe-head">
                <Typography display="inline" color="secondary" variant="h2" >{recipeDetails.name}</Typography>
                <Typography color="secondary" variant="subtitle1">From user:{' '}{recipeDetails.user_id}</Typography>
                <Typography variant="caption" color="secondary">
                    {recipeDetails.tags}
                </Typography>
            </div>
            <div className="recipe-img">
                <img src={recipeDetails.photo} />
            </div>
            <div className="feedback">
                <Typography variant="h6" color="secondary">
                    Chef Feedback:
                    </Typography>
                <div className="feedback-text">
                    <Typography variant="body1" color="primary">{recipeDetails.chef_feedback}</Typography>
                    <Typography variant="h6" color="primary">{recipeDetails.chef_grade}</Typography>
                </div>
            </div>
            <div className="ingredients">
                <Typography variant="h6" color="secondary">
                    Ingredients:
                </Typography>
                <div className="ingredients-list">
                    {recipeIngredients.map((ingredient, i) => {
                        return (
                            <Typography key={i} color="primary">
                                &#183;{' '}{ingredient.amount} {ingredient.unit} {ingredient.name}
                            </Typography>
                        )
                    })}
                </div>
            </div>
            <div className="description">
                <Typography variant="h6" color="secondary">
                    Instructions:
                    </Typography>
                <div className="description-text">
                    <Typography color="primary">{recipeDetails.description}</Typography>
                </div>
            </div>
            <div className="buttons">
                <IconButton 
                    color="secondary" 
                    size="medium" 
                    className={classes.button}
                    onClick={goBack}    
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton color="secondary" size="medium" className={classes.button}>
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton color="secondary" size="medium" className={classes.button}>
                    <DeleteOutlineIcon />
                </IconButton>
            </div>
        </div>
    )
};

export default RecipeDetail;