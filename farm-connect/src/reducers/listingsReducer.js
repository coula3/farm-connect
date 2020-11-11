const initialState = {
    isLoading: false,
    isLoadingListings: false,
    listings: [],
    listing: "",
    areListingsRendered: true
}

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_LISTING":
            return {
                ...state,
                isLoading: true
            }

        case "LOADING_NEW_LISTING":
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
                isLoadingListings: true
            };
            
        case "FETCH_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false
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

        case "LOADING_EDITED_LISTING":
            return {
                ...state,
                isLoading: true
            }

        case "EDIT_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }

        case "CLEAR_LOADING":
            return {
                ...state,
                isLoading: false
            }

        case "REMOVE_USER_LISTING_INTEREST":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }

        case "LOADING_NEW_INTEREST_ON_LISTING":
            return {
                ...state,
                isLoading: true
            }
    
        case "ADD_NEW_INTEREST_TO_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }

        case "FETCH_USER_CLOSED_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false
            }

        case "LISTINGS_RENDERED_OFF":
            return {
                ...state,
                areListingsRendered: false
            }

        case "LISTINGS_RENDERED_ON":
            return {
                ...state,
                areListingsRendered: true
            }

        default:
            return state
    }
}

export default listingsReducer;