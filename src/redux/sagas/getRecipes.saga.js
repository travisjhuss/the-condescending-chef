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

function* getRecipesSaga() {
    yield takeEvery('FETCH_MY_RECIPES', fetchUserRecipes);
}

export default getRecipesSaga;