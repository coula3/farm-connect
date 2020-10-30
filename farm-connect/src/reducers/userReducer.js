const initialState = {
    userId: "",
    userAttributes: {},
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
                isLoading: false,
                isAuthenticated: true
            }

        case "SIGN_UP_OR_LOGIN_FAILURE":
            return {
                ...state,
                isLoading: false
            }

        case "EDIT_USER":
            return {
                ...state,
                userId: action.user.id,
                userAttributes: action.user.attributes,
                isLoading: false
            }

        case "CONNECT_USERS":
            return {
                ...state,
                userId: action.user.id,
                userAttributes: action.user.attributes,
                isLoading: false
            }

        case "UNCONNECT_USERS":
            return {
                ...state,
                userId: action.user.id,
                userAttributes: action.user.attributes,
                isLoading: false
            }

        case "SIGN_OUT":
            return {
                ...state,
                userId: "",
                userAttributes: {},
                isAuthenticated: false
            }

        default:
            return state
    }

}

export default userReducer;