import * as actionTypes from '../actionTypes';

const initialState = {showMobileResourcesBoard: false};

const miscellaneousReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_MOBILE_RESOURCES_BOARD:
            return {
                ...state,
                showMobileResourcesBoard: true
            }

        case actionTypes.HIDE_MOBILE_RESOURCES_BOARD:
            return {
                ...state,
                showMobileResourcesBoard: false
            }

        default:
            return state
    }
}

export default miscellaneousReducer;