import { editRecipeDetails } from './editRecipe.reducer';

describe('testing user reducer', () => {
    // 'SET_EDITING_RECIPE'
    test('SET_EDITING_RECIPE', () => {
        const initialState = [];
        const action = { type: 'SET_EDITING_RECIPE', payload: { 
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        }};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        });
    })

    // 'EDIT_RECIPE_NAME'
    test('EDIT_RECIPE_NAME', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'EDIT_RECIPE_NAME', payload: 'new recipe name'};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'new recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        });
    })
    // 'EDIT_RECIPE_PHOTO'
    test('EDIT_RECIPE_PHOTO', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'EDIT_RECIPE_PHOTO', payload: 'newphoto.jpg'};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'newphoto.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        });
    })
    // 'EDIT_RECIPE_DESCRIPTION'
    test('EDIT_RECIPE_DESCRIPTION', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'EDIT_RECIPE_DESCRIPTION', payload: 'new recipe instructions'};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'new recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        });
    })
    // 'EDIT_RECIPE_TAGS'
    test('EDIT_RECIPE_TAGS', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'EDIT_RECIPE_TAGS', payload: '#new #tags'};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#new #tags'
        });
    })
    // EDIT_MARKED_FOR_REVIEW'
    test('EDIT_MARKED_FOR_REVIEW', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'EDIT_MARKED_FOR_REVIEW', payload: false};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: false,
            tags: '#one #two'
        });
    })
    // 'EDIT_RECIPE_URL'
    test('EDIT_RECIPE_URL', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'EDIT_RECIPE_URL', payload: 'newrecipe.com'};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'newrecipe.com',
            marked_for_review: true,
            tags: '#one #two'
        });
    })
    // default
    test('OTHER_ACTION', () => {
        const initialState = {
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        };
        const action = { type: 'OTHER_ACTION', payload: 'newrecipe.com'};

        expect(editRecipeDetails(initialState, action)).toEqual({
            name: 'recipe name', 
            description: 'recipe instructions',
            photo: 'photo.jpg',
            url: 'recipe.com',
            marked_for_review: true,
            tags: '#one #two'
        });
    })
})