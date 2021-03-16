import * as actionTypes from '../actionTypes';
import history from '../utils/history';

export const addErrorMessages = (message) => {
    return (dispatch) => {
        history.replace("/error-messages");
        dispatch({
            type: actionTypes.ADD_ERROR_MESSAGES,
            errorMessages: [`${message}`]
        });
    }
}

export const clearErrorMessages = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.CLEAR_ERROR_MESSAGES})
    }
}

export const dispatchCatchErrorMessages = (dispatch, error, routerProps) => {
    dispatch({
        type: actionTypes.ADD_ERROR_MESSAGES,
        errorMessages: [`Network Connection: (${error})`]
    });
    routerProps.history.replace("/error-messages");
}