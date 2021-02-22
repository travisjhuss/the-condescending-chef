import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllRecipes() {
    try {
        // get all recipes
        const response = yield axios.get('/api/recipes');
        console.log('fetchAllRecipes response.data', response.data);
        // save in recipes reducer
        yield put({type: 'SET_ALL_RECIPES', payload: response.data})
    } catch(err) {
        console.log('error in fetchAllRecipes:', err);   
    }
}

// GET all matching recipes to search query
function* fetchSearchResults(action) {
    // check if dispatch has a route attached
    const whichRoute = action.payload
        // if query is there
        ? axios.get('api/search', {
          params: { string: action.payload },
        })
        // if no query, response will have all recipes
        : axios.get('/api/recipes/');

    try {
        console.log('fetchSearchResults triggered', action.payload);
        const response = yield whichRoute;
        console.log('search:', response.data);
        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch(err) {
        console.log('search results error', err);
    }
}


function* searchSaga() {
    yield takeEvery('FETCH_ALL_RECIPES', fetchAllRecipes);
    yield takeEvery('FETCH_SEARCH_RESULTS', fetchSearchResults)
}

export default searchSaga;