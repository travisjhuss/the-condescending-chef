import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// MUI
import {
    Button, Typography,
    Grid, Paper,
    makeStyles, IconButton,
    Checkbox, Dialog,
    DialogTitle, DialogActions
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import './RecipeDetail.css';

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#fff4dd',
        margin: 'auto',
        padding: '10px',
        overflow: 'scroll'
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

    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

    const user = useSelector(state => state.user);
    const recipeDetails = useSelector(state => state.details.recipeDetails);
    const recipeIngredients = useSelector(state => state.details.recipeIngredients);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DETAILS', payload: id });
        dispatch({ type: 'FETCH_RECIPE_INGREDIENTS', payload: id });
    }, [id]);

    const goBack = () => {
        history.goBack();
    }

    const handleDelete = () => {
        setOpenDeleteConfirmation(true);
    }

    const confirmDelete = () => {
        dispatch({ type: 'DELETE_USER_RECIPE', payload: recipeDetails.id });
        history.push('/myRecipes');
    }

    const openEditRecipe = (id) => {
        console.log('clicked edit for:', id );
        history.push(`/editRecipe/${id}`)
    }


    console.log('recipeDetails:', recipeDetails);
    console.log('recipeIngredients:', recipeIngredients);
    return (
        <div className="recipe-container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <IconButton
                        color="secondary"
                        size="medium"
                        className={classes.button}
                        onClick={goBack}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    {user.id === recipeDetails.user_id
                        ?
                        <>
                            {recipeDetails.url === null
                            ? 
                            <IconButton 
                                color="secondary" 
                                size="medium" 
                                className={classes.button}
                                onClick={() => openEditRecipe(recipeDetails.id)}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                            : null
                            }
                            <IconButton
                                color="secondary"
                                size="medium"
                                className={classes.button}
                                onClick={handleDelete}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </>
                        : null
                    }
                </Grid>
                <Grid item xs={8}>
                    <Typography display="inline" color="secondary" variant="h2" >{recipeDetails.name}</Typography>
                    <Typography color="secondary" variant="subtitle1">From user:{' '}{recipeDetails.user_id}</Typography>
                    <Typography variant="caption" color="secondary">
                        {recipeDetails.tags}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <img src={recipeDetails.photo} className="recipe-img" />
                </Grid>
                {recipeDetails.chef_grade === '0'
                    ?
                    <Grid item xs={8} style={{ marginBottom: '40px' }}>
                        <Typography color="secondary" display="inline">Mark for Review</Typography>
                        <Checkbox
                            // onChange={() => setRecipeForReview(!recipeForReview)}
                            color="primary"
                            // value={recipeForReview}
                            style={{ color: '#fff4dd' }}
                        />
                    </Grid>
                    :
                    <Grid item xs={8}>
                        <Typography variant="h6" color="secondary" display="inline">
                            Chef Score:
                        </Typography>
                        {' '}
                        <Typography display="inline" color="secondary" variant="h5">{recipeDetails.chef_grade}</Typography>
                        <Paper className={classes.paper} style={{ height: '100px' }}>
                            <Typography variant="body1" color="primary">{recipeDetails.chef_feedback}</Typography>
                        </Paper>
                    </Grid>
                }
                {recipeDetails.url
                    ?
                    <Grid item xs={6}>
                        <Button endIcon={<OpenInNewIcon />} color="secondary">
                            <Typography display="inline" color="secondary" variant="h5">Open Recipe</Typography>
                        </Button>
                    </Grid>
                    :
                    <>
                        <Grid item xs={6}>
                            <Typography variant="h6" color="secondary">
                                Ingredients:
                            </Typography>
                            <Paper className={classes.paper} style={{ height: '250px' }}>
                                {recipeIngredients.map((ingredient, i) => {
                                    return (
                                        <Typography key={i} color="primary">
                                            &#183;{' '}{ingredient.amount} {ingredient.unit} {ingredient.name}
                                        </Typography>
                                    )
                                })}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color="secondary">
                                Instructions:
                            </Typography>
                            <Paper className={classes.paper} style={{ height: '250px' }}>
                                <Typography color="primary">{recipeDetails.description}</Typography>
                            </Paper>
                        </Grid>
                    </>
                }
            </Grid>
            <Dialog
                maxWidth="sm"
                open={openDeleteConfirmation}
            >
                <div style={{ backgroundColor: '#fff4dd' }}>
                    <DialogTitle style={{ color: '#ad4830' }}>Are you sure you want to delete this recipe?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteConfirmation(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="secondary" variant="outlined" style={{ backgroundColor: '#990f02'}}>
                            Delete
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div >
    )
};

export default RecipeDetail;