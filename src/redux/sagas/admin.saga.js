import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// get all recipes that need review
function* fetchAllRecipesForReview() {
    try {
        console.log('in fetchAllRecipe for admin');
        const response = yield axios.get('/api/admin');
        console.log('fetchAllRecipes response.data', response.data);
        // save in recipes reducer
        yield put({type: 'SET_RECIPES_TO_REVIEW', payload: response.data})
    } catch(err) {
        console.log('error in fetchAllRecipesForReview:', err);   
    }
}

// PUT feedback into reviewed recipe
function* addFeedbackToRecipe(action) {
    try {
        console.log('in addFeedbackToRecipe:', action.payload);
        yield axios.put(`/api/admin/feedback/${action.payload.recipeId}`, action.payload);
        yield put({type: 'FETCH_ALL_RECIPES_FOR_REVIEW'});
    } catch(err) {
        console.log('error in fetchAllRecipesForReview:', err);   
    }
}

function* adminSaga() {
    yield takeEvery('FETCH_ALL_RECIPES_FOR_REVIEW', fetchAllRecipesForReview);
    yield takeEvery('ADD_FEEDBACK_TO_RECIPE', addFeedbackToRecipe)
}

export default adminSaga;