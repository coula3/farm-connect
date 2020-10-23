const initialState = {
    isLoading: false,
    listings: [],
    listing: ""
}

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_LISTING":
            return {
                ...state,
                isLoading: true
            }

        case "CREATE_NEW_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }

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

        case "LOADING_EXISTING_LISTING":
            return {
                ...state,
                isLoading: true
            }

        case "FETCH_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }
    
        default:
            return state
    }
}

export default listingsReducer;