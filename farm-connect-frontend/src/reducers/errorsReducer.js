import * as actionTypes from '../actionTypes';

const initialState = {errorMessages: []};

export const errorsReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ERROR_MESSAGES:
            return {
                ...state.messages,
                errorMessages: action.errorMessages
            }

        case actionTypes.CLEAR_ERROR_MESSAGES:
            return {
                ...state,
                errorMessages: []
            }

        default:
            return state;
    }
}