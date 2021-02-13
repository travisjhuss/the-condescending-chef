import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
    const [newRecipe, setNewRecipe] = useState(editRecipeDetails);
    let [newTags, setNewTags] = useState(editRecipeDetails.tags);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT', payload: id });
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT_INGREDIENTS', payload: id });
    }, [id]);

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


    const handleNewRecipeChange = (event) => {
        setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
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

    console.log('newRecipe:', newRecipe);
    console.log('ingredientFields', ingredientFields);
    return (
        <div className="edit-container">
            <center>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<LibraryAddIcon />}
                // onClick={submitRecipe}
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
                value={newRecipe.name}
                name="name"
                onChange={handleNewRecipeChange}
            />
            <TextField
                variant="filled"
                label="Photo url"
                style={{ width: '400px' }}
                className={classes.input}
                value={newRecipe.photo}
                name="photo"
                onChange={handleNewRecipeChange}
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
                value={newRecipe.description}
                name="description"
                onChange={handleNewRecipeChange}
            />
            {' '}
            <TextField
                variant="filled"
                label="Tags"
                style={{ width: '400px' }}
                value={newTags}
                onChange={(event) => setNewTags(event.target.value)}
                className={classes.input}
            />
        </div>
    )
}

export default EditRecipe;