import { Typography } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import './EditRecipe.css';

function EditRecipe() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_TO_EDIT', payload: id });
        // dispatch({ type: 'FETCH_RECIPE_INGREDIENTS', payload: id });
    }, [id]);

    return(
        <div className="edit-container">
            <Typography color="secondary">IN EDIT RECIPE</Typography>
        </div>
    )
}

export default EditRecipe;