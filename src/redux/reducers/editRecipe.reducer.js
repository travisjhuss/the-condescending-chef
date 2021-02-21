import { combineReducers } from 'redux';

// reducer for editing recipe, stores and returns changes
const editRecipeDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_EDITING_RECIPE':
            return action.payload;
        case 'EDIT_RECIPE_NAME':
            return { ...state, name: action.payload };
        case 'EDIT_RECIPE_PHOTO':
            return { ...state, photo: action.payload };
        case 'EDIT_RECIPE_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'EDIT_RECIPE_TAGS':
            return { ...state, tags: action.payload };
        case 'EDIT_MARKED_FOR_REVIEW':
            return { ...state, marked_for_review: action.payload };
        case 'EDIT_RECIPE_URL':
            return { ...state, url: action.payload };
        default:
            return state;
    }
};

// reducer for editing ingredients, stores and returns changes
const editRecipeIngredients = (state = [], action) => {
    switch (action.type) {
        case 'SET_EDITING_RECIPE_INGREDIENTS':
            return action.payload;
        case 'EDIT_INGREDIENT_AMOUNT':
            state[Number(action.payload[0])].amount = Number(action.payload[1]);
            return [...state];
        case 'EDIT_INGREDIENT_UNIT':
            state[Number(action.payload[0])].unit = action.payload[1];
            return [...state];
        case 'EDIT_INGREDIENT_NAME':
            state[Number(action.payload[0])].name = action.payload[1];
            return [...state];
        case 'ADD_INGREDIENT_TO_EDIT':
            // add ingredient with no values
            const newIngredient = {
                amount: '',
                unit: '',
                name: ''
            }
            return [...state, newIngredient];
        case 'REMOVE_INGREDIENT_FROM_EDIT':
            state = state.filter(ingredient => ingredient.name !== action.payload);
            return [...state];
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