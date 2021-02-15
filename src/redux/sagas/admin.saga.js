import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllRecipesForReview() {
    try {
        // get all recipes
        console.log('in fetchAllRecipe for admin');
        const response = yield axios.get('/api/admin');
        console.log('fetchAllRecipes response.data', response.data);
        // save in recipes reducer
        yield put({type: 'SET_RECIPES_TO_REVIEW', payload: response.data})
    } catch(err) {
        console.log('error in fetchAllRecipesForReview:', err);   
    }
}

function* adminSaga() {
    yield takeEvery('FETCH_ALL_RECIPES_FOR_REVIEW', fetchAllRecipesForReview);
}

export default adminSaga;