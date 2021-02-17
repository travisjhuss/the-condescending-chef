import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddSuccess from '../AddSuccess/AddSuccess';
import AddFail from '../AddFail/AddFail';
// mui
import { TextField, Button, IconButton, makeStyles, Typography, Checkbox, Dialog, Snackbar, Grid } from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import './AddOutRecipe.css';

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

function AddOutsideRecipe() {

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const classes = useStyles();

    const [recipeName, setRecipeName] = useState('');
    const [recipePhoto, setRecipePhoto] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [recipeForReview, setRecipeForReview] = useState(false);
    let [tags, setTags] = useState('');
    const [newTag, setNewTag] = useState('');

    // for dialog box
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const handleFailClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenFail(false);
    };


    const addTag = () => {
        if (newTag !== '') {
            setTags(tags += ` #${newTag}`)
            setNewTag('');
        }
    }

    const submitRecipe = () => {

        if (recipeName === '' || recipeUrl === '') {
            setOpenFail(true);
        } else {
            //check to see if photo is empty string
            if (recipePhoto === '') {
                const recipeToAdd = {
                    user_id: user.id,
                    name: recipeName,
                    photo: 'https://www.greenbiz.com/sites/default/files/images/articles/featured/fooddisplaysstock.jpg',
                    marked_for_review: recipeForReview,
                    url: recipeUrl,
                    tags: tags
                };
                console.log('recipeToAdd:', recipeToAdd);
                dispatch({ type: 'ADD_NEW_OUTSIDE_RECIPE', payload: recipeToAdd });
                // success dialog
                setOpenSuccess(true);
            } else {
                const recipeToAdd = {
                    user_id: user.id,
                    name: recipeName,
                    photo: recipePhoto,
                    marked_for_review: recipeForReview,
                    url: recipeUrl,
                    tags: tags
                };
                console.log('recipeToAdd:', recipeToAdd);
                dispatch({ type: 'ADD_NEW_OUTSIDE_RECIPE', payload: recipeToAdd });
                // success dialog
                setOpenSuccess(true);
            }
        }
    }

    // console.log('tags:', tags);
    // console.log('recipeName:', recipeName);
    console.log('recipePhoto:', recipePhoto);
    // console.log('recipeURL:', recipeUrl);
    // console.log('markedforreview?', recipeForReview);
    return (
        <div className="outside-recipe-container">
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
                    <Dialog
                        maxWidth="sm"
                        open={openSuccess}
                    // onClose={handleClose}
                    >
                        <AddSuccess />
                    </Dialog>

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