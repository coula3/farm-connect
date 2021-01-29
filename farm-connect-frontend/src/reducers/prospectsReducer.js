import * as actionTypes from '../actionTypes';

const initialState = {
    isLoadingProspect: false,
    isLoadingProspects: false,
    prospects: [],
    prospect: {}
}

const prospectsReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.LOADING_PROSPECTS:
            return {
                ...state,
                isLoadingProspects: true
            }
            
        case actionTypes.FETCH_PROSPECTS:
            return {
                ...state,
                prospects: action.prospects,
                isLoadingProspects: false
            }

        case actionTypes.LOADING_PROSPECT:
            return {
                ...state,
                isLoadingProspect: true
            }

        case actionTypes.FETCH_PROSPECT:
            return {
                ...state,
                prospect: action.prospect,
                isLoadingProspect: false
            }

        case actionTypes.CLEAR_PROSPECTS:
            return {
                ...state,
                isLoadingProspect: false,
                isLoadingProspects: false,
                prospects: [],
                prospect: {}
            }

        default:
            return state
    }
}

export default prospectsReducer;