import { combineReducers } from 'redux';

const recipesToReview = (state = [], action) => {
    switch (action.type) {
      case 'SET_RECIPES_TO_REVIEW':
        return action.payload;
      default:
        return state;
    }
  };
  
  // recipesToReview will be on the redux state at:
  // state.admin.recipeToReview
  export default combineReducers({
    recipesToReview,
});