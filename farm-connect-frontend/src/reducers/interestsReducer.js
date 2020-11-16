const initialState = {
    isLoadingInterests: false,
    listingsInterests: []
};

export const interestsReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOADING_LISTINGS_INTERESTS":
            return {
                ...state,
                isLoadingInterests: true
            }

        case "FETCH_LISTINGS_INTERESTS":
            return {
                ...state,
                listingsInterests: action.listingsInterests,
                isLoadingInterests: false
            }
        
        default:
            return state
    }
}