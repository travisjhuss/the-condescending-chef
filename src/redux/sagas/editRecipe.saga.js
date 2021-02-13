import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipeToEdit(action) {
    try {
        console.log('fetchRecipeToEdit at id:', action.payload);
        const response = yield axios.get(`api/recipes/${action.payload}`);

        console.log('response in fetch edit', response.data[0]);
        // yield put({type: 'SET_EDITING_STUDENT', payload: response.data[0]})
    } catch (err) {
        console.log('error in fetchRecipeToEdit', err)
    }
}

function* editRecipeSaga() {
    yield takeEvery('FETCH_RECIPE_TO_EDIT', fetchRecipeToEdit);
}

export default editRecipeSaga;