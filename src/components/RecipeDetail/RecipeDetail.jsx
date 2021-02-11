import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './RecipeDetail.css';

function RecipeDetail() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_RECIPE_DETAILS', payload: id});
        dispatch({type: 'FETCH_RECIPE_INGREDIENTS', payload: id});
    }, []);

    return(
        <h1>in recipe detail</h1>
    )
};

export default RecipeDetail;