import { combineReducers } from 'redux';

const recipeDetails = (state = [], action) => {
    switch (action.type) {
      case 'SET_SELECTED_RECIPE':
        return action.payload;
      default:
        return state;
    }
  };

const recipeIngredients = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_RECIPE_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};
  
  // recipeDetails will be on the redux state at:
  // state.details.recipeDetails. &
  // state.details.recipeIngredients
  
  export default combineReducers({
    recipeDetails,
    recipeIngredients
  });