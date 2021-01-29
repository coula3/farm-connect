import * as actionTypes from '../actionTypes';

const initialState = {
    userId: "",
    userAttributes: {},
    photo: null,
    isLoading: false,
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_USER:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.SIGN_UP_OR_LOGIN_SUCCESS:
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                photo: action.photo,
                isLoading: false,
                isAuthenticated: true
            }

        case actionTypes.SIGN_UP_OR_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.UPDATE_CURRENT_USER:
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                photo: action.photo,
                isLoading: false
            }

        case actionTypes.EDIT_USER:
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                isLoading: false
            }

        case actionTypes.ADD_USER_PHOTO:
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                photo: action.photo,
                isLoading: false
            }

        case actionTypes.SIGN_OUT:
            return {
                ...state,
                userId: "",
                userAttributes: {},
                photo: null,
                isAuthenticated: false
            }

        default:
            return state
    }
}

export default userReducer;