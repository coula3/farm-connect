import * as actionTypes from '../actionTypes';

const initialState = {
    isLoading: false,
    commodities: []
};

const commoditiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOADING_COMMODITIES:
            return {
                ...state,
                isLoading: true
            }
        
        case actionTypes.FETCH_COMMODITIES:
            return {
                ...state,
                commodities: action.commodities,
                isLoading: false
            }

        case actionTypes.CLEAR_COMMODITIES:
            return {
                ...state,
                isLoading: false,
                commodities: []
            }

        default:
            return state
    }
}

export default commoditiesReducer;