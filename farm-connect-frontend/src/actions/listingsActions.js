import { fetchListingsInterests } from './interestsActions';
import { reFetchUser } from './userActions';

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
            if(json.data){
                dispatch({
                    type: "CREATE_NEW_LISTING",
                    listing: json.data
                });
                dispatch(fetchListings());
                ownProps.history.push(`/listings/${json.data.id}`);
            } else {
                dispatch({
                    type: "ADD_ERROR_MESSAGES",
                    errorMessages: json.messages
                });
            }
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
            if(json.data){
                dispatch({
                    type: "EDIT_LISTING",
                    listing: json.data
                });
                ownProps.history.push(`/listings/${listingId}`);
            } else {
                dispatch({
                    type: "ADD_ERROR_MESSAGES",
                    errorMessages: json.messages
                });
                dispatch({type: "CLEAR_LOADING"});
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
            dispatch(fetchListingsInterests());
            dispatch(reFetchUser(payload.listing.currentUserId));
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
            dispatch(fetchListingsInterests());
            dispatch(reFetchUser(currentUserId));
        })
    }
}

export const fetchUserClosedListings = (userId) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTINGS"});
        fetch(`http://localhost:3000/api/v1/listings?id=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "FETCH_USER_CLOSED_LISTINGS",
                listings: json.data
            });
        })
    }
}

export const listingsRendered = () => {
    return (dispatch) => {
        dispatch({type: "LISTINGS_RENDERED_ON"})
    }
}

export const listingsUnrendered = () => {
    return (dispatch) => {
        dispatch({type: "LISTINGS_RENDERED_OFF"})
    }
}

export const deleteListing = (listingId) => {
    return (dispatch) => {
        dispatch({type: "DELETING_LISTING"});
        fetch(`http://localhost:3000/api/v1/listings/${listingId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            if(json.user){
                dispatch({type: "RESET_DELETING"});
                dispatch({
                    type: "UPDATE_USER_AFTER_DELETE",
                    user: json.user
                });
                dispatch(fetchListings());
            } else {
                console.log(json)
            }
        });
    }
}