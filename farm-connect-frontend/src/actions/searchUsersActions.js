import * as actionTypes from '../actionTypes';

export const searchUsers = (payload, routerProps) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_SEARCH_RESULTS});
        fetch(`http://localhost:3000/api/v1/users?q=${payload.searchText}&type=${payload.userType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
             dispatch({
                type: actionTypes.ADD_SEARCH_RESULTS,
                searchResults: object.users
            });
        })
        .catch(error => {
            dispatch({type: actionTypes.CLEAR_LOADING_SEARCH_RESULTS})
            dispatch({
                type: actionTypes.ADD_ERROR_MESSAGES,
                errorMessages: [`Network Connection: (${error})`]
            });
            routerProps.history.replace("/error-messages");
        })
    }
}

export const clearSearchResults = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.CLEAR_SEARCH_RESULTS});
    }
}