const initialState = {
    isLoading: false,
    listings: []
}

const manageListings = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_LISTINGS":
            return {
                ...state,
                isLoading: true
            };
            
        case "FETCH_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoading: false
            }
    
        default:
            return state
    }
}

export default manageListings;