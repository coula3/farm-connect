import * as actionTypes from '../../actionTypes';

export const dispatchCatchErrorMessages = (dispatch, error, routerProps) => {
    dispatch({
        type: actionTypes.ADD_ERROR_MESSAGES,
        errorMessages: [`Network Connection: (${error})`]
    });
    routerProps.history.replace("/error-messages");
}