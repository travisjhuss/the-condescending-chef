import { recipeDetails, recipeIngredients } from '../recipeDetails.reducer';

const testDetails = {
  name: 'recipe name',
  description: 'recipe instructions',
  photo: 'photo.jpg',
  url: 'recipe.com',
  marked_for_review: true,
  tags: '#one #two',
};

const testIngredients = [
  { recipe_id: 1, name: 'ingredientName1', unit: 'g', amount: '1' },
  { recipe_id: 1, name: 'ingredientName2', unit: 'g', amount: '2' },
  { recipe_id: 1, name: 'ingredientName3', unit: 'g', amount: '3' },
];

describe('testing return of recipeDetails', () => {
  // 'SET_SELECTED_RECIPE'
  test('SET_SELECTED_RECIPE', () => {
    const initialState = [];
    const action = {
      type: 'SET_SELECTED_RECIPE',
      payload: testDetails,
    };

    expect(recipeDetails(initialState, action)).toEqual(testDetails);
  });
});

describe('testing return of recipeIngredients', () => {
  // 'SET_SELECTED_RECIPE'
  test('SET_SELECTED_RECIPE_INGREDIENTS', () => {
    const initialState = [];
    const action = {
      type: 'SET_SELECTED_RECIPE_INGREDIENTS',
      payload: testIngredients,
    };

    expect(recipeIngredients(initialState, action)).toEqual(testIngredients);
  });
});
