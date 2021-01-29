import * as actionTypes from '../actionTypes';

const initialState = {
    isLoading: false,
    searchResults: []
}

const searchUsersReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOADING_RESULTS:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.ADD_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults,
                isLoading: false
            }

        case actionTypes.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: []
            }

        default:
        return state
    }
}

export default searchUsersReducer;