const initialState = {
    isLoading: false,
    searchResults: []
}

const searchUsersReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOADING_RESULTS":
            return {
                ...state,
                isLoading: true
            }

        case "ADD_SEARCH_RESULTS":
            return {
                ...state,
                searchResults: action.searchResults,
                isLoading: false
            }

        default:
        return state
    }
}

export default searchUsersReducer;