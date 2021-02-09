import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postNewUserRecipe(action) {
    try {
        console.log('in postNewUserRecipe:', action.payload);
        const newRecipe = action.payload;
        yield axios.post("/api/userAddedRecipe", { newRecipe });
    } catch(err) {
        console.log('error in postNewUserRecipe:', err);   
    }
}


function* addRecipeSaga() {
    yield takeEvery('ADD_NEW_USER_RECIPE', postNewUserRecipe);
}

export default addRecipeSaga;