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
        
        // const response = yield axios.get('/api/userRecipes');
        // console.log('fetchUserRecipes response.data', response.data);
        // // save in recipes reducer
        // yield put({type: 'SET_USER_RECIPES', payload: response.data})
    } catch(err) {
        console.log('error in fetchUserRecipes:', err);   
    }
}

function* fetchRecipeIngredients(action) {
    try {
        // get recipe ingredients at ID
        console.log('fetchRecipeIngredients at id:', action.payload);
        // const response = yield axios.get('/api/userRecipes');
        // console.log('fetchUserRecipes response.data', response.data);
        // // save in recipes reducer
        // yield put({type: 'SET_USER_RECIPES', payload: response.data})
    } catch(err) {
        console.log('error in fetchUserRecipes:', err);   
    }
}



function* getRecipesSaga() {
    yield takeEvery('FETCH_MY_RECIPES', fetchUserRecipes);
    yield takeEvery('FETCH_RECIPE_DETAILS', fetchRecipeDetails);
    yield takeEvery('FETCH_RECIPE_INGREDIENTS', fetchRecipeIngredients);
}

export default getRecipesSaga;
