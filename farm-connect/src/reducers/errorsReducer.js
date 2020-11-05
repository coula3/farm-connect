const initialState = {errorMessages: []};

export const errorsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "ADD_ERROR_MESSAGES":
            return {
                ...state.messages,
                errorMessages: action.errorMessages
            }

        case "CLEAR_ERROR_MESSAGES":
            return {
                ...state,
                messages: []
            }

        default:
            return state;
    }
}