const initialState = {
    isLoading: false,
    isLoadingListings: false,
    listings: [],
    listing: "",
    openListingsRendered: false,
    myInterestsRendered: false,
    deleting: false
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
            
        case "ADD_OPEN_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false
            }

        case "ADD_USER_INTERESTS_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false,
                openListingsRendered: false,
                myInterestsRendered: true
            }

        case "LOADING_EXISTING_LISTING":
            return {
                ...state,
                isLoading: true
            }

        case "ADD_LISTING":
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

        case "REMOVE_USER_INTEREST_ON_LISTING":
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
    
        case "ADD_USER_INTEREST_TO_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }

        case "ADD_USER_CLOSED_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false
            }

        case "LISTINGS_RENDERED_TRUE":
            return {
                ...state,
                openListingsRendered: true,
                myInterestsRendered: false
            }

        case "LISTINGS_RENDERED_FALSE":
            return {
                ...state,
                openListingsRendered: false,
                myInterestsRendered: false
            }


        case "DELETING_LISTING":
            return {
                ...state,
                deleting: true
            }

        case "RESET_DELETING":
            return {
                ...state,
                deleting: false
            }

        case "CLEAR_LISTINGS":
            return {
                ...state,
                isLoading: false,
                isLoadingListings: false,
                listings: [],
                listing: "",
                openListingsRendered: false,
                deleting: false
            }

        default:
            return state
    }
}

export default listingsReducer;