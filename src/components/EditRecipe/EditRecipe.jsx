import { Typography } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import './EditRecipe.css';

function EditRecipe() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const editRecipeDetails = useSelector(state => state.edit.editRecipeDetails);
    const editRecipeIngredients = useSelector(state => state.edit.editRecipeIngredients);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT', payload: id });
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT_INGREDIENTS', payload: id });
    }, [id]);

 

    console.log('editRecipeDetails:', editRecipeDetails);
    console.log('editRecipeIngredients', editRecipeIngredients);
    return(
        <div className="edit-container">
            <Typography color="secondary">IN EDIT RECIPE</Typography>
        </div>
    )
}

export default EditRecipe;