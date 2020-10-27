const initialState = {
    isLoadingProspect: false,
    isLoadingProspects: false,
    prospects: []
}

const prospectsReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOADING_PROSPECTS":
            return {
                ...state,
                isLoadingProspects: true
            }
            
        case "FETCH_PROSPECTS":
            return {
                ...state,
                prospects: action.prospects,
                isLoadingProspects: false
            }

        case "LOADING_PROSPECT":
            return {
                ...state,
                isLoadingProspect: true
            }

        case "FETCH_PROSPECT":
            return {
                ...state,
                prospect: action.prospect,
                isLoadingProspect: false
            }

        default:
            return state
    }
}

export default prospectsReducer;