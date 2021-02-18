import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFiveFromAllRecipes() {
    try {
        // 
        const response = yield axios.get('/api/dashboard/fiveAll');
        console.log('fetchFiveFromAllRecipes response.data', response.data);
        // save in recipes reducer
        yield put({type: 'SET_FIVE_ALL_RECIPES', payload: response.data})
    } catch(err) {
        console.log('error in fetchFiveFromAllRecipes:', err);   
    }
}

function* fetchFiveFromMyRecipes() {
    try {
        // 
        const response = yield axios.get('/api/dashboard/fiveMy');
        console.log('fetchFiveFromMyRecipes response.data', response.data);
        // save in recipes reducer
        yield put({type: 'SET_FIVE_MY_RECIPES', payload: response.data})
    } catch(err) {
        console.log('error in fetchFiveFromMyRecipes:', err);   
    }
}

function* dashboardSaga() {
    yield takeEvery('FETCH_FIVE_FROM_ALL_RECIPES', fetchFiveFromAllRecipes);
    yield takeEvery('FETCH_FIVE_FROM_MY_RECIPES', fetchFiveFromMyRecipes);
}

export default dashboardSaga;