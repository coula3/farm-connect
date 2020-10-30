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

export const createListing = (payload, ownProps) => {
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
            ownProps.history.push(`/listings`);
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

export const editListing = (listingId, payload, ownProps) => {
    return (dispatch) => {
        dispatch({type: "LOADING_EDITED_LISTING"});
        fetch(`http://localhost:3000/api/v1/listings/${listingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({listing: payload})
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "EDIT_LISTING",
                listing: json.data
            });
            if(json.data.attributes.closed){
                ownProps.history.push(`/listings`);
            } else {
            ownProps.history.push(`/listings/${listingId}`);
            }
        })
    }
}

export const removeUserListingInterest = (listingId, payload) => {
    return (dispatch) => {
        dispatch({type: "LOADING_EXISTING_LISTING"});
        fetch(`http://localhost:3000/api/v1/listings/${listingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "REMOVE_USER_LISTING_INTEREST",
                listing: json.data
            });
        })
    }
}

export const addUserListingInterest = (currentUserId, listingId) => {
 return (dispatch) => {
        dispatch({type: "LOADING_NEW_INTEREST_ON_LISTING"});
        fetch(`http://localhost:3000/api/v1/listings/${listingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({listing: {currentUserId: currentUserId}})
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "ADD_NEW_INTEREST_TO_LISTING",
                listing: json.data
            })
        })
    }
}