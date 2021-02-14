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

    const [ingredientFields, setIngredientFields] = useState(editRecipeIngredients);

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
        const values = [...ingredientFields];
        values.push({
            amount: '',
            unit: '',
            name: ''
        });
        setIngredientFields(values);
    }

    const handleRemove = (i) => {
        const values = [...ingredientFields];
        values.splice(i, 1);
        setIngredientFields(values);
    }


    const handleAmountChange = (index, event) => {
        const values = [...ingredientFields];
        values[index].amount = event.target.value
        setIngredientFields(values);
    }

    const handleUnitChange = (index, event) => {
        const values = [...ingredientFields];
        values[index].unit = event.target.value
        setIngredientFields(values);
    }

    const handleNameChange = (index, event) => {
        const values = [...ingredientFields];
        values[index].name = event.target.value
        setIngredientFields(values);
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

    console.log('ingredientFields', ingredientFields);
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
            {ingredientFields.map((ing, idx) => {
                return (
                    <div key={`${idx}`}>
                        <TextField
                            required
                            variant="filled"
                            name="amount"
                            label="#"
                            type="number"
                            size="small"
                            style={{ width: '70px' }}
                            className={classes.input}
                            value={ing.amount}
                            onChange={e => handleAmountChange(idx, e)}
                        />
                        <TextField
                            required
                            variant="filled"
                            name="unit"
                            label="unit"
                            type="text"
                            size="small"
                            style={{ width: '90px' }}
                            className={classes.input}
                            value={ing.unit}
                            onChange={e => handleUnitChange(idx, e)}
                        />
                        <TextField
                            required
                            variant="filled"
                            name="name"
                            label="name"
                            type="text"
                            size="small"
                            style={{ width: '300px' }}
                            className={classes.input}
                            value={ing.name}
                            onChange={e => handleNameChange(idx, e)}
                        />
                        <IconButton
                            color="primary"
                            type="button"
                            onClick={() => handleRemove(idx)}
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