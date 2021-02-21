import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddSuccess from '../AddSuccess/AddSuccess';
import AddFail from '../AddFail/AddFail';
// mui
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { TextField, Button, IconButton, makeStyles, Typography, Checkbox, Dialog, Snackbar, Grid } from '@material-ui/core';

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
        margin: '2px',
    },
    resize: {
        fontSize: '18px'
    },
})

function AddUserRecipe() {

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);
    // states for form inputs
    let [tags, setTags] = useState('');
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
    // for form confirmation or failure
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const handleFailClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFail(false);
    };

    // curry function
    // const handleNewRecipeChange = (event) => {
    //     setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
    // }

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
    // add another set of ingredient inputs
    const handleAdd = () => {
        const values = [...ingredientFields];
        values.push({
            amount: null,
            unit: null,
            name: null
        });
        setIngredientFields(values);
    }
    // remove set of ingredient inputs
    const handleRemove = (i) => {
        const values = [...ingredientFields];
        values.splice(i, 1);
        setIngredientFields(values);
    }

    const addTag = () => {
        if (newTag !== '') {
            setTags(tags += ` #${newTag}`)
            setNewTag('');
        }
    }


    const submitRecipe = () => {
        // check to make sure that none of the ingredient inputs are blank
        for (let ingredient of ingredientFields) {
            if (ingredient.amount === null || ingredient.unit === null || ingredient.name === null) {
                setOpenFail(true);
            }
        }
        // chef if required fields are blank
        if (recipeName === '' || recipeDescription === '') {
            // if yes, open alert
            setOpenFail(true);
        } else {
            // else  move on
            // check if photo is blank
            if (recipePhoto === '') {
                // if no photo, then add default photo
                const recipeToAdd = {
                    user_id: user.id,
                    name: recipeName,
                    description: recipeDescription,
                    photo: 'https://www.greenbiz.com/sites/default/files/images/articles/featured/fooddisplaysstock.jpg',
                    marked_for_review: recipeForReview,
                    ingredients: ingredientFields,
                    tags: tags
                };
                console.log('recipeToAdd:', recipeToAdd);
                // send recipe to saga for post
                dispatch({ type: 'ADD_NEW_USER_RECIPE', payload: recipeToAdd });
                // success dialog
                setOpenSuccess(true);
            } else {
                // if recipe has photo
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
                // send recipe to saga for post
                dispatch({ type: 'ADD_NEW_USER_RECIPE', payload: recipeToAdd });
                // success dialog
                setOpenSuccess(true);
            }
        }
    }

    const classes = useStyles();

    return (
        <div className="user-recipe-container">
            <center>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            variant="filled"
                            label="Recipe Name"
                            style={{ width: '500px' }}
                            className={classes.input}
                            value={recipeName}
                            InputProps={{
                                classes: {
                                    input: classes.resize
                                }
                              }}
                            onChange={(event) => setRecipeName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            label="Photo url"
                            style={{ width: '500px' }}
                            className={classes.input}
                            value={recipePhoto}
                            InputProps={{
                                classes: {
                                    input: classes.resize
                                }
                              }}
                            onChange={(event) => setRecipePhoto(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography display="inline" variant="h6" color="secondary">Ingredients</Typography>
                        <IconButton color="primary" type="button" onClick={() => handleAdd()}>
                            <AddCircleIcon />
                        </IconButton>
                        {/* map through ingredients and create inputs for each */}
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
                                        style={{ width: '60px' }}
                                        className={classes.input}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                          }}
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
                                        style={{ width: '75px' }}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                          }}
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
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                          }}
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            variant="filled"
                            label="Instructions"
                            multiline
                            rows={8}
                            style={{ width: '500px' }}
                            className={classes.input}
                            InputProps={{
                                classes: {
                                    input: classes.resize
                                }
                              }}
                            value={recipeDescription}
                            onChange={(event) => setRecipeDescription(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="secondary">
                            Tags:{' '}{tags}
                        </Typography>
                        <br />
                        <TextField
                            variant="filled"
                            label="add Tag"
                            style={{ width: '400px' }}
                            value={newTag}
                            InputProps={{
                                classes: {
                                    input: classes.resize
                                }
                              }}
                            onChange={(event) => setNewTag(event.target.value)}
                            className={classes.input}
                        />
                        <IconButton color="primary" type="button" onClick={() => addTag()}>
                            <AddCircleIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography display="inline" color="secondary">Mark for Review</Typography>
                        <Checkbox
                            onChange={() => setRecipeForReview(!recipeForReview)}
                            color="primary"
                            value={recipeForReview}
                            style={{ color: '#ad4830' }}
                        />
                        {' '}
                        <Button
                            style={{marginLeft: '100px'}}
                            color="primary"
                            variant="contained"
                            endIcon={<LibraryAddIcon />}
                            onClick={submitRecipe}
                        >
                            <Typography color="secondary">Add Recipe</Typography>
                        </Button>
                    </Grid>
                </Grid>
            
            {/* success pop up */}
            <Dialog
                maxWidth="sm"
                open={openSuccess}
            >
                <AddSuccess />
            </Dialog>
            {/* missing fields pop up */}
            <Snackbar
                autoHideDuration={6000}
                open={openFail}
                onClose={handleFailClose}
            >
                <AddFail handleFailClose={handleFailClose} />
            </Snackbar>
            </center>
        </div>
    )
}

export default AddUserRecipe;