const allRecipesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

// search will be on the redux state at:
// state.allRecipes
export default allRecipesReducer;