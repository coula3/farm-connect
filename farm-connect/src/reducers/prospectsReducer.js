const initialState = {
    isLoading: false,
    prospects: []
}

const prospectsReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOADING_PROSPECTS":
            return {
                ...state,
                isLoading: true
            }
            
        case "FETCH_PROSPECTS":
            return {
                ...state,
                prospects: action.prospects,
                isLoading: false
            }

        default:
            return state
    }
}

export default prospectsReducer;