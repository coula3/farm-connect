const initialState = {
    isLoading: false,
    isLoadingListings: false,
    listings: [],
    listing: "",
    countUserInterestsListings: 0,
    hasListingChanged: false,
    openListingsRendered: false,
    closedListingsRendered: false,
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

        case "LOADING_LISTINGS":
            return {
                ...state,
                isLoadingListings: true
            };

        case "CLEAR_LOADING":
            return {
                ...state,
                isLoading: false
            }

        case "CREATE_NEW_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }
            
        case "ADD_OPEN_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false,
                hasListingChanged: false,
            }

        case "ADD_USER_CLOSED_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                closedListingsRendered: true,
                isLoadingListings: false
            }

        case "ADD_USER_INTERESTS_LISTINGS":
            return {
                ...state,
                listings: action.listings,
                isLoadingListings: false,
                hasListingChanged: false,
                myInterestsRendered: true,
                openListingsRendered: false,
                closedListingsRendered: false
            }

        case "ADD_USER_INTERESTS_LISTINGS_COUNT":
            return {
                ...state,
                countUserInterestsListings: action.listings.length,
                isLoadingListings: false
            }

        case "ADD_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false
            }

        case "EDIT_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false,
                hasListingChanged: true
            }

        case "ADD_USER_INTEREST_TO_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false,
                hasListingChanged: true
            }

        case "REMOVE_USER_INTEREST_ON_LISTING":
            return {
                ...state,
                listing: action.listing,
                isLoading: false,
                hasListingChanged: true
            }

        case "LISTINGS_RENDERED_TRUE":
            return {
                ...state,
                openListingsRendered: true,
                closedListingsRendered: false,
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
                countUserInterestsListings: 0,
                openListingsRendered: false,
                closedListingsRendered: false,
                myInterestsRendered: false,
                deleting: false
            }

        default:
            return state
    }
}

export default listingsReducer;