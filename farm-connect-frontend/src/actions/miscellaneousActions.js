import * as actionTypes from '../actionTypes';

export const showMobileResourcesBoard = () => {
    return dispatch => {
        dispatch({type: actionTypes.SHOW_MOBILE_RESOURCES_BOARD});
    }
}

export const hideMobileResourcesBoard = () => {
    return dispatch => {
        dispatch({type: actionTypes.HIDE_MOBILE_RESOURCES_BOARD});
    }
}