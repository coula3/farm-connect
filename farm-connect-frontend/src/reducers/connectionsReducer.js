import * as actionTypes from '../actionTypes';

const initialState = {
    isLoading: false,
    userConnects: null
}

const connectionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.LOADING_CONNECTS:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.ADD_USER_CONNECTS:
            return {
                ...state,
                userConnects: action.userConnects,
                isLoading: false
            }

        case actionTypes.CONNECT_USERS:
            return {
                ...state,
                userConnects: action.userConnects,
                isLoading: false
            }

        case actionTypes.ACCEPT_CONNECT:
            return {
                ...state,
                userConnects: action.userConnects,
                isLoading: false
            }

        case actionTypes.UNCONNECT_USERS:
            return {
                ...state,
                userConnects: action.userConnects,
                isLoading: false
            }

        case actionTypes.CLEAR_CONNECTIONS:
            return {
                ...state,
                isLoading: false,
                userConnects: null
            }

        default:
            return state
    }
}

export default connectionsReducer;