const initialState = {
    userId: "",
    userAttributes: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        type: ""
    },
    isLoading: false,
    isAuthenticated: false
}

const manageUser = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                userId: action.user.data.id,
                userAttributes: action.user.data.attributes,
                isLoading: false,
                isAuthenticated: true
            }

        case "LOGIN_FAILURE":
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }

}

export default manageUser;