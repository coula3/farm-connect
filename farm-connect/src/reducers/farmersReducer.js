const initialState = {
    farmer: {},
    isLoading: false
}

const farmersReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOADING_FARMER":
            return {
                ...state,
                isLoading: true
            }

        case "FETCH_FARMER":
            return {
                ...state,
                farmer: action.farmer,
                isLoading: false
            }

        default:
            return state
    }
}

export default farmersReducer;