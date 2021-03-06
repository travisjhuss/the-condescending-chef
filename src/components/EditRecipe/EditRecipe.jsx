import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditSuccess from '../EditSuccess/EditSuccess';
import AddFail from '../AddFail/AddFail';
// MUI
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  Dialog,
  Snackbar,
  Checkbox,
} from '@material-ui/core';
//custom hook
import useStyles from '../../hooks/useStyles';

function EditRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const editRecipeDetails = useSelector(
    (state) => state.edit.editRecipeDetails
  );
  const editRecipeIngredients = useSelector(
    (state) => state.edit.editRecipeIngredients
  );

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
  // add ingredient inputs
  const handleAdd = () => {
    dispatch({ type: 'ADD_INGREDIENT_TO_EDIT' });
  };
  // remove ingredient inputs
  const handleRemove = (name) => {
    dispatch({ type: 'REMOVE_INGREDIENT_FROM_EDIT', payload: name });
  };

  const submitChanges = () => {
    // check if recipe had url
    if (editRecipeDetails.url === null) {
      // if recipe does not have url
      // check if each ingredient has any missing info
      for (let ingredient of editRecipeIngredients) {
        if (
          ingredient.amount === '' ||
          ingredient.unit === '' ||
          ingredient.name === ''
        ) {
          setOpenFail(true);
        }
      }
      // check if recipe has any missing inputs
      if (
        editRecipeDetails.name === '' ||
        editRecipeDetails.description === ''
      ) {
        setOpenFail(true);
      } else {
        // package edited recipe
        const editedRecipe = {
          ...editRecipeDetails,
          ingredients: editRecipeIngredients,
        };
        console.log('editedRecipe:', editedRecipe);
        // send to saga for PUT
        dispatch({ type: 'SUBMIT_EDITED_RECIPE', payload: editedRecipe });
        // success dialog
        setOpenSuccess(true);
      }
    } else if (editRecipeDetails.url !== null) {
      // if recipe does have url, send to saga for PUT
      dispatch({ type: 'SUBMIT_EDITED_RECIPE', payload: editRecipeDetails });
      // success dialog
      setOpenSuccess(true);
    }
  };

  return (
    <center className="edit-container">
      <center>
        <Button
          color="primary"
          variant="contained"
          // endIcon={<LibraryAddIcon />}
          onClick={() => history.goBack()}
        >
          <Typography color="secondary">Cancel</Typography>
        </Button>{' '}
        <Button
          color="primary"
          variant="contained"
          endIcon={<LibraryAddIcon />}
          onClick={submitChanges}
        >
          <Typography color="secondary">Save Changes</Typography>
        </Button>
      </center>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Typography display="inline" color="secondary">
            Mark for Review
          </Typography>
          <Checkbox
            onChange={(event) => {
              dispatch({
                type: 'EDIT_MARKED_FOR_REVIEW',
                payload: event.target.checked,
              });
            }}
            color="primary"
            checked={editRecipeDetails.marked_for_review ? true : false}
            style={{ color: '#ad4830' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="filled"
            label="Recipe Name"
            style={{ width: '500px' }}
            className={classes.input}
            value={editRecipeDetails.name}
            onChange={(event) => {
              dispatch({
                type: 'EDIT_RECIPE_NAME',
                payload: event.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            label="Photo url"
            style={{ width: '500px' }}
            className={classes.input}
            value={editRecipeDetails.photo}
            onChange={(event) => {
              dispatch({
                type: 'EDIT_RECIPE_PHOTO',
                payload: event.target.value,
              });
            }}
          />
        </Grid>
        {/* check it recipe has url */}
        {editRecipeDetails.url === null ? (
          // if recipe has no url, show proper inputs for ingredients and description
          <>
            <Grid item xs={12}>
              <Typography
                display="inline"
                variant="subtitle1"
                color="secondary"
              >
                Ingredients
              </Typography>
              <IconButton
                color="primary"
                type="button"
                onClick={() => handleAdd()}
              >
                <AddCircleIcon />
              </IconButton>
            </Grid>
            {editRecipeIngredients.map((ing, i) => {
              return (
                <Grid item xs={12} key={`${i}`}>
                  <TextField
                    required
                    variant="filled"
                    label="#"
                    type="number"
                    size="small"
                    name={`${i}`}
                    style={{ width: '60px' }}
                    className={classes.input}
                    value={ing.amount}
                    onChange={(event) => {
                      dispatch({
                        type: 'EDIT_INGREDIENT_AMOUNT',
                        payload: [event.target.name, event.target.value],
                      });
                    }}
                  />
                  <TextField
                    required
                    variant="filled"
                    name={`${i}`}
                    label="unit"
                    type="text"
                    size="small"
                    style={{ width: '75px' }}
                    className={classes.input}
                    value={ing.unit}
                    onChange={(event) => {
                      dispatch({
                        type: 'EDIT_INGREDIENT_UNIT',
                        payload: [event.target.name, event.target.value],
                      });
                    }}
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
                    onChange={(event) => {
                      dispatch({
                        type: 'EDIT_INGREDIENT_NAME',
                        payload: [event.target.name, event.target.value],
                      });
                    }}
                  />
                  <IconButton
                    color="primary"
                    type="button"
                    onClick={() => handleRemove(ing.name)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <TextField
                required
                variant="filled"
                label="Description"
                multiline
                rows={10}
                style={{ width: '500px' }}
                className={classes.input}
                value={editRecipeDetails.description}
                onChange={(event) => {
                  dispatch({
                    type: 'EDIT_RECIPE_DESCRIPTION',
                    payload: event.target.value,
                  });
                }}
              />
            </Grid>
          </>
        ) : (
          // if recipe does have url, show proper input
          <Grid item xs={12}>
            <TextField
              variant="filled"
              label="Recipe URL"
              style={{ width: '500px' }}
              value={editRecipeDetails.url}
              className={classes.input}
              onChange={(event) => {
                dispatch({
                  type: 'EDIT_RECIPE_URL',
                  payload: event.target.value,
                });
              }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            variant="filled"
            label="Tags"
            style={{ width: '500px' }}
            value={editRecipeDetails.tags}
            className={classes.input}
            onChange={(event) => {
              dispatch({
                type: 'EDIT_RECIPE_TAGS',
                payload: event.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
      <Dialog maxWidth="sm" open={openSuccess}>
        <EditSuccess />
      </Dialog>

      <Snackbar
        autoHideDuration={6000}
        open={openFail}
        onClose={handleFailClose}
      >
        <AddFail handleFailClose={handleFailClose} />
      </Snackbar>
    </center>
  );
}

export default EditRecipe;
