const initialState = {
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

        default:
            return state
    }
}

export default prospectsReducer;