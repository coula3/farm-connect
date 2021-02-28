import * as actionTypes from '../actionTypes';

const initialState = {
    farmer: {},
    photo: null,
    isLoadingFarmer: false
}

const farmersReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOADING_FARMER:
            return {
                ...state,
                isLoadingFarmer: true
            }

        case actionTypes.FETCH_FARMER:
            return {
                ...state,
                farmer: action.farmer,
                photo: action.photo,
                isLoadingFarmer: false
            }

        case actionTypes.CLEAR_FARMER:
            return {
                ...state,
                farmer: {},
                photo: null,
                errMessage: "",
                isLoadingFarmer: false
            }

        default:
            return state
    }
}

export default farmersReducer;