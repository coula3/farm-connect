const initialState = {
    isLoading: false,
    userConnects: {}
}

const connectionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "LOADING_CONNECTS":
            return {
                ...state,
                isLoading: true
            }

        case "ADD_USER_CONNECTS":
            return {
                ...state,
                userConnects: action.userConnects,
                isLoading: false
            }
        default:
            return state
    }
}

export default connectionsReducer;