// stores search results
const searchResultsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

// search will be on the redux state at:
// state.searchResults
export default searchResultsReducer;