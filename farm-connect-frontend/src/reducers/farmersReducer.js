const initialState = {
    farmer: {},
    photo: null,
    errMessage: "",
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
                photo: action.photo,
                isLoadingFarmer: false
            }

        case "ADD_FARMER_ERR_MESSAGE":
            return {
                ...state,
                errMessage: action.errMessage,
                isLoadingFarmer: false
            }

        case "CLEAR_FARMER":
            return {
                ...state,
                farmer: {},
                photo: null,
                errMessage: "",
                isLoadingFarmer: false
            }

        default:
            return state
    }
}

export default farmersReducer;