import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// POSTS to user generated recipe
function* postNewUserRecipe(action) {
    try {
        console.log('in postNewUserRecipe:', action.payload);
        const newRecipe = action.payload;
        yield axios.post("/api/userRecipes", { newRecipe });
    } catch(err) {
        console.log('error in postNewUserRecipe:', err);   
    }
}

// POSTS recipe from url
function* postNewOutsideRecipe(action) {
    try {
        console.log('in postNewOutsideRecipe:', action.payload);
        const newRecipe = action.payload;
        yield axios.post("/api/outsideAddedRecipe", { newRecipe });
    } catch(err) {
        console.log('error in postNewOutsideRecipe:', err);   
    }
}


function* addRecipeSaga() {
    yield takeEvery('ADD_NEW_USER_RECIPE', postNewUserRecipe);
    yield takeEvery('ADD_NEW_OUTSIDE_RECIPE', postNewOutsideRecipe);
}

export default addRecipeSaga;