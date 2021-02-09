import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// mui
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { TextField, Button, IconButton, makeStyles, Typography, Checkbox } from '@material-ui/core';

import './AddUserRecipe.css';

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

function AddUserRecipe() {

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [recipePhoto, setRecipePhoto] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeForReview, setRecipeForReview] = useState(false);
    const [ingredientFields, setIngredientFields] = useState([{
        amount: null,
        unit: null,
        name: null
    }]);

    function handleRecipeToAddChange(value, stateSetter) {
        stateSetter(value);
    }

    function handleAmountChange(index, event) {
        const values = [...ingredientFields];
        values[index].amount = event.target.value
        setIngredientFields(values);
    }

    function handleUnitChange(index, event) {
        const values = [...ingredientFields];
        values[index].unit = event.target.value
        setIngredientFields(values);
    }

    function handleNameChange(index, event) {
        const values = [...ingredientFields];
        values[index].name = event.target.value
        setIngredientFields(values);
    }

    function handleAdd() {
        const values = [...ingredientFields];
        values.push({
            amount: null,
            unit: null,
            name: null
        });
        setIngredientFields(values);
    }

    function handleRemove(i) {
        const values = [...ingredientFields];
        values.splice(i, 1);
        setIngredientFields(values);
    }

    function addTag() {
        if (newTag !== '') {
        tags.push({name: newTag})
        setNewTag('');
        }
    }

    function submitRecipe() {
        const recipeToAdd = {
            user_id: user.id,
            name: recipeName,
            description: recipeDescription,
            photo: recipePhoto,
            marked_for_review: recipeForReview,
            ingredients: ingredientFields,
            tags: tags
        };
        console.log('recipeToAdd:', recipeToAdd);
        dispatch({type: 'ADD_NEW_USER_RECIPE', payload: recipeToAdd});
    }

    const classes = useStyles();

    console.log('ingredientFields:', ingredientFields);
    console.log('tags:', tags);
    console.log('recipeName:', recipeName);
    console.log('recipePhoto:', recipePhoto);
    console.log('recipeDescription:', recipeDescription);
    console.log('markedforreview?', recipeForReview);
    return (
        <div className="user-recipe-container">
            <TextField
                required
                variant="filled"
                label="Recipe Name"
                style={{ width: '500px' }}
                className={classes.input}
                value={recipeName}
                onChange={(event) => handleRecipeToAddChange(event.target.value, setRecipeName)}
            />
            <TextField
                variant="filled"
                label="Photo url"
                style={{ width: '400px' }}
                className={classes.input}
                value={recipePhoto}
                onChange={(event) => handleRecipeToAddChange(event.target.value, setRecipePhoto)}
            />
            <br />
            <Typography display="inline" variant="subtitle1" color="secondary">Ingredients</Typography>
            <IconButton color="primary" type="button" onClick={() => handleAdd()}>
                <AddCircleIcon />
            </IconButton>
            {ingredientFields.map((field, idx) => {
                return (
                    <div key={`${field}-${idx}`}>
                        <TextField
                            required
                            variant="filled"
                            name="amount"
                            label="#"
                            type="number"
                            size="small"
                            style={{ width: '70px' }}
                            className={classes.input}
                            value={field.amount || ""}
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
                            value={field.unit || ""}
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
                            value={field.name || ""}
                            onChange={e => handleNameChange(idx, e)}
                        />
                        <IconButton color="primary" type="button" onClick={() => handleRemove(idx)}>
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
                value={recipeDescription}
                onChange={(event) => handleRecipeToAddChange(event.target.value, setRecipeDescription)}
            />
            <Typography display="inline" color="secondary">Mark for Review</Typography>
            <Checkbox
                onChange={() => setRecipeForReview(!recipeForReview)}
                color="primary"
                value={recipeForReview}
                style={{ color: '#ad4830' }}
            />
            <br/>
            <Typography color="secondary">
                Tags:{tags.map((tag, i) => {
                    return(<span key={i}>{' '}&#183;{tag.name}{' '}</span>)
                })}
            </Typography>
            <br/>
            <TextField
                variant="filled"
                label="add Tag"
                style={{ width: '400px' }}
                value={newTag}
                onChange={(event) => setNewTag(event.target.value)}
                className={classes.input}
            />
            <IconButton color="primary" type="button" onClick={() => addTag()}>
                <AddCircleIcon />
            </IconButton>
            <Button 
                color="primary" 
                variant="contained" 
                endIcon={<LibraryAddIcon/>}
                onClick={submitRecipe}
            >
                <Typography color="secondary">Add Recipe</Typography>
            </Button>
        </div>
    )
}

export default AddUserRecipe;