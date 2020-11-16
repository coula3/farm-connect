export const clearErrorMessages = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_ERROR_MESSAGES"})
    }
}