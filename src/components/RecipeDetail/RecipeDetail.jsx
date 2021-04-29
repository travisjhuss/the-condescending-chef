import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// MUI
import {
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditOutlinedIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
// custom hook
import useStyles from '../../hooks/useStyles';

function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const user = useSelector((state) => state.user);
  const recipeDetails = useSelector((state) => state.details.recipeDetails);
  const recipeIngredients = useSelector(
    (state) => state.details.recipeIngredients
  );

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_DETAILS", payload: id });
    dispatch({ type: "FETCH_RECIPE_INGREDIENTS", payload: id });
  }, [id]);

  const goBack = () => {
    history.goBack();
  };

  const handleDelete = () => {
    setOpenDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch({ type: "DELETE_USER_RECIPE", payload: recipeDetails.id });
    history.push("/myRecipes");
  };

  const openEditRecipe = (id) => {
    console.log("clicked edit for:", id);
    history.push(`/editRecipe/${id}`);
  };

  // from stack overflow
  // allows recipe link to open in new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="recipe-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IconButton
            color="secondary"
            size="medium"
            className={classes.recipeDetailButton}
            onClick={goBack}
          >
            <ArrowBackIosIcon />
          </IconButton>
          {/* if recipe being viewed was created by logged in user, allow for delete and edit */}
          {user.id === recipeDetails.user_id && (
            <>
              <IconButton
                color="secondary"
                size="medium"
                className={classes.recipeDetailButton}
                onClick={() => openEditRecipe(recipeDetails.id)}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                color="secondary"
                size="medium"
                className={classes.recipeDetailButton}
                onClick={handleDelete}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item xs={8}>
          <Typography display="inline" color="secondary" variant="h2">
            {recipeDetails.name}
          </Typography>
          <Typography color="secondary" variant="subtitle1">
            From user: {recipeDetails.user_id}
          </Typography>
          <Typography variant="caption" color="secondary">
            {recipeDetails.tags}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img src={recipeDetails.photo} className="recipe-img" />
        </Grid>
        {/* check if recipe has a grade */}
        {recipeDetails.chef_grade === "0" ? (
          // if recipe has no grade, show if it is set for review
          <Grid item xs={8} style={{ marginBottom: "40px" }}>
            <Typography color="secondary" display="inline">
              Marked for Review:{" "}
              {recipeDetails.marked_for_review ? "Yes" : "No"}
            </Typography>
          </Grid>
        ) : (
          // if recipe has grade, show score and feedback
          <Grid item xs={8}>
            <Typography variant="h6" color="secondary" display="inline">
              Chef Score:
            </Typography>{" "}
            <Typography display="inline" color="secondary" variant="h5">
              {recipeDetails.chef_grade}
            </Typography>
            <Paper className={classes.paper} style={{ height: "100px" }}>
              <Typography variant="h6" color="primary">
                {recipeDetails.chef_feedback}
              </Typography>
            </Paper>
          </Grid>
        )}
        {/* check if recipe has url */}
        {recipeDetails.url ? (
          // if there is a url, show button to open in new tab
          <Grid item xs={6}>
            <Button
              endIcon={<OpenInNewIcon />}
              color="secondary"
              // onclick open link in new tab
              onClick={() => openInNewTab(recipeDetails.url)}
            >
              <Typography display="inline" color="secondary" variant="h5">
                Open Recipe
              </Typography>
            </Button>
          </Grid>
        ) : (
          // if recipe is user created, show details
          <>
            <Grid item xs={6}>
              <Typography variant="h6" color="secondary">
                Ingredients:
              </Typography>
              <Paper className={classes.paper} style={{ height: "250px" }}>
                {recipeIngredients.map((ingredient, i) => {
                  return (
                    <Typography key={i} color="primary" variant="h6">
                      &#183; {ingredient.amount} {ingredient.unit}{" "}
                      {ingredient.name}
                    </Typography>
                  );
                })}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="secondary">
                Instructions:
              </Typography>
              <Paper className={classes.paper} style={{ height: "250px" }}>
                <Typography
                  color="primary"
                  variant="h6"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {recipeDetails.description}
                </Typography>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>

      {/* delete confirmation */}
      <Dialog maxWidth="sm" open={openDeleteConfirmation}>
        <div style={{ backgroundColor: "#fff4dd" }}>
          <DialogTitle style={{ color: "#ad4830" }}>
            Are you sure you want to delete this recipe?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteConfirmation(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              color="secondary"
              variant="outlined"
              style={{ backgroundColor: "#990f02" }}
            >
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default RecipeDetail;
