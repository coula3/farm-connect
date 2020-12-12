const initialState = {
    isLoading: false,
    connects: {}
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
                connects: action.connects,
                isLoading: false
            }
        default:
            return state
    }
}

export default connectionsReducer;