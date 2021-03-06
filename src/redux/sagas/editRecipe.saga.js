import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// GET recipe for edit
function* fetchRecipeToEdit(action) {
    try {
        console.log('fetchRecipeToEdit at id:', action.payload);
        const response = yield axios.get(`api/recipes/${action.payload}`);
        console.log('response in fetch edit', response.data[0]);
        yield put({type: 'SET_EDITING_RECIPE', payload: response.data[0]})
    } catch (err) {
        console.log('error in fetchRecipeToEdit', err)
    }
}

// get ingredients for edit
function* fetchRecipeToEditIngredients(action) {
    try {
        console.log('fetchRecipeToEditIngredients at id:', action.payload);
        const response = yield axios.get(`/api/recipes/ingredients/${action.payload}`);
        console.log('response in fetch edit ingredients', response.data);
        yield put({type: 'SET_EDITING_RECIPE_INGREDIENTS', payload: response.data})
    } catch (err) {
        console.log('error in fetchRecipeToEdit', err);
    }
}

// PUT changes from edit into recipe
function* submitEditedRecipe(action) {
    try {
        console.log('submitEditedRecipe payload:', action.payload);
        yield axios.put(`/api/recipes/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_MY_RECIPES' });
    } catch(err) {
        console.log('error in submitEditedRecipe', err);
    }
}

function* editRecipeSaga() {
    yield takeEvery('FETCH_RECIPE_TO_EDIT', fetchRecipeToEdit);
    yield takeEvery('FETCH_RECIPE_TO_EDIT_INGREDIENTS', fetchRecipeToEditIngredients);
    yield takeEvery('SUBMIT_EDITED_RECIPE', submitEditedRecipe);
}

export default editRecipeSaga;