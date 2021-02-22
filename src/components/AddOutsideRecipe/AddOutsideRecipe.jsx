import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddSuccess from '../AddSuccess/AddSuccess';
import AddFail from '../AddFail/AddFail';
// mui
import { TextField, Button, IconButton, makeStyles, Typography, Checkbox, Dialog, Snackbar, Grid } from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import './AddOutRecipe.css';

// custom styles
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
    },
    resize: {
        fontSize: '18px'
    },
})

function AddOutsideRecipe() {

    const dispatch = useDispatch();
    // get user data from reducer
    const user = useSelector((store) => store.user);
    // assign to styles to classes
    const classes = useStyles();
    // states for form inputs
    const [recipeName, setRecipeName] = useState('');
    const [recipePhoto, setRecipePhoto] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [recipeForReview, setRecipeForReview] = useState(false);
    let [tags, setTags] = useState('');
    const [newTag, setNewTag] = useState('');
    // for dialog box
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    // function for closing form failure alert
    const handleFailClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFail(false);
    };
    // function to add tag to tags string
    const addTag = () => {
        if (newTag !== '') {
            setTags(tags += ` #${newTag}`)
            setNewTag('');
        }
    }
    // submitting recipe function
    const submitRecipe = () => {
        // check to see required fields are not blank
        if (recipeName === '' || recipeUrl === '') {
            // if fields are blank, open alert
            setOpenFail(true);
        } else {
            // check to see if photo is empty string
            if (recipePhoto === '') {
                // if no photo used, apply default photo
                const recipeToAdd = {
                    user_id: user.id,
                    name: recipeName,
                    photo: 'https://www.greenbiz.com/sites/default/files/images/articles/featured/fooddisplaysstock.jpg',
                    marked_for_review: recipeForReview,
                    url: recipeUrl,
                    tags: tags
                };
                console.log('recipeToAdd:', recipeToAdd);
                // send recipe to saga for post
                dispatch({ type: 'ADD_NEW_OUTSIDE_RECIPE', payload: recipeToAdd });
                // success dialog
                setOpenSuccess(true);
            } else {
                // if recipe does have photo
                const recipeToAdd = {
                    user_id: user.id,
                    name: recipeName,
                    photo: recipePhoto,
                    marked_for_review: recipeForReview,
                    url: recipeUrl,
                    tags: tags
                };
                console.log('recipeToAdd:', recipeToAdd);
                // send recipe to saga for post
                dispatch({ type: 'ADD_NEW_OUTSIDE_RECIPE', payload: recipeToAdd });
                // success dialog
                setOpenSuccess(true);
            }
        }
    }

    const fillForm = () => {
        console.log('fill form clicked');
        setRecipeName('Roast Chicken');
        setRecipePhoto('https://cafedelites.com/wp-content/uploads/2017/12/Garlic-Herb-Butter-Roast-Chicken-1.jpg');
        setRecipeUrl('https://cafedelites.com/garlic-herb-butter-roast-chicken/');
        setTags('#chicken #roast #comfort');
    }

    return (
        <div className="outside-recipe-container">
            <center>
            <Button onClick={fillForm}></Button>
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
                        <TextField
                            required
                            variant="filled"
                            label="Recipe url"
                            style={{ width: '500px' }}
                            className={classes.input}
                            value={recipeUrl}
                            InputProps={{
                                classes: {
                                    input: classes.resize
                                }
                              }}
                            onChange={(event) => setRecipeUrl(event.target.value)}
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

                    {/*  dialog to confirm recipe was added successfully */}
                    <Dialog
                        maxWidth="sm"
                        open={openSuccess}
                    >
                        <AddSuccess />
                    </Dialog>

                    {/*  alert for failure to add recipe */}
                    <Snackbar
                        autoHideDuration={6000}
                        open={openFail}
                        onClose={handleFailClose}
                    >
                        <AddFail handleFailClose={handleFailClose} />
                    </Snackbar>
                </Grid>
            </center>
        </div>
    )
}

export default AddOutsideRecipe;