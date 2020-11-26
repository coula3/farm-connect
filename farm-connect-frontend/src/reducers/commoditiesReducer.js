const initialState = {
    isLoading: false,
    commodities: []
};

const commoditiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOADING_COMMODITIES":
            return {
                ...state,
                isLoading: true
            }
        
        case "FETCH_COMMODITIES":
            return {
                ...state,
                commodities: action.commodities,
                isLoading: false
            }

        case "CLEAR_COMMODITIES":
            return {
                ...state,
                isLoading: false,
                commodities: []
            }

        default:
            return state
    }
}

export default commoditiesReducer;