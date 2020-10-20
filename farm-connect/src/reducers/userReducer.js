const initialState = {
    userId: "",
    userAttributes: {},
    isLoading: false,
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
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

        case "SIGN_OUT_USER":
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