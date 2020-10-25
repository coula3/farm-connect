const initialState = {
    farmer: {},
    isLoadingFarmer: false
}

const farmersReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOADING_FARMER":
            return {
                ...state,
                isLoadingFarmer: true
            }

        case "FETCH_FARMER":
            return {
                ...state,
                farmer: action.farmer,
                isLoadingFarmer: false
            }

        default:
            return state
    }
}

export default farmersReducer;