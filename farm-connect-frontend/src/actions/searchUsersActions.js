export const searchFarmers = (searchText) => {
    return (dispatch) => {
        dispatch({type: "LOADING_RESULTS"});
        fetch(`http://localhost:3000/api/v1/users?q=${searchText}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
             dispatch({
                type: "ADD_SEARCH_RESULTS",
                searchResults: json.users
            });
        })
    }
}

export const clearSearchResults = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_SEARCH_RESULTS"});
    }
}