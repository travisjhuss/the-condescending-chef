import { combineReducers } from 'redux';

const fiveAllRecipes = (state = [], action) => {
    switch (action.type) {
        case 'SET_FIVE_ALL_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

const fiveUserRecipes = (state = [], action) => {
    switch (action.type) {
        case 'SET_FIVE_MY_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

// recipeDetails will be on the redux state at:
// state.dash.fiveAllRecipes. &
// state.dash.fiveUserRecipes
export default combineReducers({
    fiveAllRecipes,
    fiveUserRecipes
});