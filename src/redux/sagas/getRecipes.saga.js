import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserRecipes() {
    try {
        // get users recipes
        const response = yield axios.get('/api/userRecipes');
        console.log('fetchUserRecipes response.data', response.data);
        // save in recipes reducer
        yield put({type: 'SET_USER_RECIPES', payload: response.data})
    } catch(err) {
        console.log('error in fetchUserRecipes:', err);   
    }
}

function* fetchRecipeDetails(action) {
    try {
        // get recipe details at ID
        console.log('fetchRecipeDetails at id:', action.payload);
        const response = yield axios.get(`/api/recipes/${action.payload}`);
        console.log('fetchRecipeDetails response.data:', response.data[0]);
        // save in recipe reducer
        yield put({type: 'SET_SELECTED_RECIPE', payload: response.data[0]});
    } catch(err) {
        console.log('error in fetchUserRecipes:', err);   
    }
}

function* fetchRecipeIngredients(action) {
    try {
        // get recipe ingredients at ID
        console.log('fetchRecipeIngredients at id:', action.payload);
        const response = yield axios.get(`/api/recipes/ingredients/${action.payload}`);
        console.log('fetchRecipeIngredients response.data:', response.data);
        // // save in recipe ingredients reducer
        yield put({type: 'SET_SELECTED_RECIPE_INGREDIENTS', payload: response.data})
    } catch(err) {
        console.log('error in fetchUserRecipes:', err);   
    }
}

function* deleteUserRecipe(action) {
    try {
        // delete recipe from logged in user
        const deleteID = action.payload;
        console.log('deleting recipe with id:', deleteID);
        yield axios.delete(`/api/recipes/${deleteID}`);
        yield put({ type: 'FETCH_MY_RECIPES' });
    } catch (err) {
        console.log('error in deleteUserRecipe', err);
    }
}



function* getRecipesSaga() {
    yield takeEvery('FETCH_MY_RECIPES', fetchUserRecipes);
    yield takeEvery('FETCH_RECIPE_DETAILS', fetchRecipeDetails);
    yield takeEvery('FETCH_RECIPE_INGREDIENTS', fetchRecipeIngredients);
    yield takeEvery('DELETE_USER_RECIPE', deleteUserRecipe);
}

export default getRecipesSaga;
