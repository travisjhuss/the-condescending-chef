import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCoffees(action) {
    const whichRoute = action.payload
      ? axios.get('api/coffees/search', {
          params: { string: action.payload },
        })
      : axios.get('/api/coffees/');
  
    try {
      const response = yield whichRoute;
      yield put({ type: 'SET_COFFEES', payload: response.data });
    } catch (err) {
      console.log('error in fetchCoffees', err);
    }
  }

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

function* fetchSearchResults(action) {

    const whichRoute = action.payload
      ? axios.get('api/search', {
          params: { string: action.payload },
        })
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