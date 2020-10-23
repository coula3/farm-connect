export const fetchListings = () => {
 return (dispatch) => {
    dispatch({type: "LOADING_LISTINGS"});
    fetch(`http://localhost:3000/api/v1/listings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {
        dispatch({
            type: "FETCH_LISTINGS",
            listings: json.data
            });
        });
    }
}

export const createListing = (payload) => {
    return (dispatch) => {
        dispatch({type: "LOADING_NEW_LISTING"})
        fetch(`http://localhost:3000/api/v1/listings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "CREATE_NEW_LISTING",
                listing: json.data
            });
        })
    }
}

export const fetchListing = (id) => {
    return (dispatch) => {
        dispatch({type: "LOADING_EXISTING_LISTING"})
        fetch(`http://localhost:3000/api/v1/listings/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "FETCH_LISTING",
                listing: json.data
            });
        })
    }
}