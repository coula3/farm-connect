import * as actionTypes from '../actionTypes';

export const clearErrorMessages = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.CLEAR_ERROR_MESSAGES})
    }
}