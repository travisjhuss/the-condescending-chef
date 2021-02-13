import { combineReducers } from 'redux';

const editRecipeDetails = (state = [], action) => {
    switch (action.type) {
      case 'SET_EDITING_RECIPE':
        return action.payload;
      default:
        return state;
    }
  };

const editRecipeIngredients = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDITING_RECIPE_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};


// recipeDetails will be on the redux state at:
// state.edit.editRecipeDetails. &
// state.edit.editRecipeIngredients
export default combineReducers({
    editRecipeDetails,
    editRecipeIngredients
  });