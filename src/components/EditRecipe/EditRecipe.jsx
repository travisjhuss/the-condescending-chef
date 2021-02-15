import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditSuccess from '../EditSuccess/EditSuccess';
import AddFail from '../AddFail/AddFail';
// MUI
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { TextField, Button, IconButton, makeStyles, Typography, Grid, Dialog, Snackbar } from '@material-ui/core';

import './EditRecipe.css';

const useStyles = makeStyles({
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

function EditRecipe() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    const user = useSelector(state => state.user);
    const editRecipeDetails = useSelector(state => state.edit.editRecipeDetails);
    const editRecipeIngredients = useSelector(state => state.edit.editRecipeIngredients);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT', payload: id });
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT_INGREDIENTS', payload: id });
    }, [id]);

    const handleFailClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenFail(false);
    };

    const handleAdd = () => {
        dispatch({type: 'ADD_INGREDIENT_TO_EDIT'});
    }

    const handleRemove = (name) => {
        dispatch({type: 'REMOVE_INGREDIENT_FROM_EDIT', payload: name});
    }


    const submitChanges = () => {

        setNewRecipe({ ...newRecipe, ingredients: ingredientFields });
        for (let ingredient of ingredientFields) {
            if (ingredient.amount === '' || ingredient.unit === '' || ingredient.name === '') {
                setOpenFail(true);
            } else {
                if (newRecipe.name === '' || newRecipe.description === '') {
                    setOpenFail(true);
                } else {
                    setNewRecipe({ ...newRecipe, ingredients: ingredientFields });
                    // dispatch({ type: 'ADD_NEW_USER_RECIPE', payload: recipeToAdd });
                    // success dialog
                    setOpenSuccess(true);
                }
            }
        }
    }

    console.log('editRecipeIng:', editRecipeIngredients);
    console.log('editRecipeDeets:', editRecipeDetails);
    return (
        <div className="edit-container">
            <center>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<LibraryAddIcon />}
                    onClick={submitChanges}
                >
                    <Typography color="secondary">Save Changes</Typography>
                </Button>
            </center>
            <br />
            <TextField
                required
                variant="filled"
                label="Recipe Name"
                style={{ width: '500px' }}
                className={classes.input}
                value={editRecipeDetails.name}
                onChange={(event) => {dispatch({type: 'EDIT_RECIPE_NAME', payload: event.target.value})}}
            />
            <TextField
                variant="filled"
                label="Photo url"
                style={{ width: '400px' }}
                className={classes.input}
                value={editRecipeDetails.photo}
                onChange={(event) => {dispatch({type: 'EDIT_RECIPE_PHOTO', payload: event.target.value})}}
            />
            <br />
            <Typography display="inline" variant="subtitle1" color="secondary">Ingredients</Typography>
            <IconButton
                color="primary"
                type="button"
                onClick={() => handleAdd()}
            >
                <AddCircleIcon />
            </IconButton>
            {editRecipeIngredients.map((ing, i) => {
                return (
                    <div key={`${i}`}>
                        <TextField
                            required
                            variant="filled"
                            label="#"
                            type="number"
                            size="small"
                            name={`${i}`}
                            style={{ width: '70px' }}
                            className={classes.input}
                            value={ing.amount}
                            onChange={(event) => {dispatch({type: 'EDIT_INGREDIENT_AMOUNT', payload: [event.target.name, event.target.value]})}}
                        />
                        <TextField
                            required
                            variant="filled"
                            name={`${i}`}
                            label="unit"
                            type="text"
                            size="small"
                            style={{ width: '90px' }}
                            className={classes.input}
                            value={ing.unit}
                            onChange={(event) => {dispatch({type: 'EDIT_INGREDIENT_UNIT', payload: [event.target.name, event.target.value]})}}
                        />
                        <TextField
                            required
                            variant="filled"
                            name={`${i}`}
                            label="name"
                            type="text"
                            size="small"
                            style={{ width: '300px' }}
                            className={classes.input}
                            value={ing.name}
                            onChange={(event) => {dispatch({type: 'EDIT_INGREDIENT_NAME', payload: [event.target.name, event.target.value]})}}
                        />
                        <IconButton
                            color="primary"
                            type="button"
                            onClick={() => handleRemove(ing.name)}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>
                );
            })
            }
            <br />
            <TextField
                required
                variant="filled"
                label="Description"
                multiline
                rows={10}
                style={{ width: '500px' }}
                className={classes.input}
                value={editRecipeDetails.description}
                onChange={(event) => {dispatch({type: 'EDIT_RECIPE_DESCRIPTION', payload: event.target.value})}}
            />
            {' '}
            <TextField
                variant="filled"
                label="Tags"
                style={{ width: '400px' }}
                value={editRecipeDetails.tags}
                className={classes.input}
                onChange={(event) => {dispatch({type: 'EDIT_RECIPE_TAGS', payload: event.target.value})}}
            />
            <Dialog
                maxWidth="sm"
                open={openSuccess}
            >
                <EditSuccess />
            </Dialog>

            <Snackbar
                autoHideDuration={6000}
                open={openFail}
                onClose={handleFailClose}
            >
                <AddFail handleFailClose={handleFailClose} />
            </Snackbar>
        </div>
    )
}

export default EditRecipe;