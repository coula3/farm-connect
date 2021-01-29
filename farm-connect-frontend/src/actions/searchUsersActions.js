import * as actionTypes from '../actionTypes';

export const searchUsers = (payload) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_RESULTS});
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
    }
}

export const clearSearchResults = () => {
    return (dispatch) => {
        dispatch({type: actionTypes .CLEAR_SEARCH_RESULTS});
    }
}