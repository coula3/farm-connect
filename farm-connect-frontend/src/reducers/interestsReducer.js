import * as actionTypes from '../actionTypes';

const initialState = {
    isLoadingInterests: false,
    listingsInterests: []
};

export const interestsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOADING_LISTINGS_INTERESTS:
            return {
                ...state,
                isLoadingInterests: true
            }

        case actionTypes.FETCH_LISTINGS_INTERESTS:
            return {
                ...state,
                listingsInterests: action.listingsInterests,
                isLoadingInterests: false
            }

        case actionTypes.CLEAR_INTERESTS:
            return {
                ...state,
                isLoadingInterests: false,
                listingsInterests: []
            }
        
        default:
            return state
    }
}