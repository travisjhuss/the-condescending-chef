const userRecipesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_RECIPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.userRecipes
  export default userRecipesReducer;