const initialState = {
    userId: "",
    userAttributes: {},
    photo: null,
    isLoading: false,
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_USER":
            return {
                ...state,
                isLoading: true
            }

        case "SIGN_UP_OR_LOGIN_SUCCESS":
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                photo: action.photo,
                isLoading: false,
                isAuthenticated: true
            }

        case "SIGN_UP_OR_LOGIN_FAILURE":
            return {
                ...state,
                messages: action.messages,
                isLoading: false
            }

        case "EDIT_USER":
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                isLoading: false
            }

        case "ADD_USER_PHOTO":
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                photo: action.photo,
                isLoading: false
            }

        case "CONNECT_USERS":
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                isLoading: false
            }

        case "UNCONNECT_USERS":
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                isLoading: false
            }

        case "SIGN_OUT":
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