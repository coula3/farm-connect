import { fetchListingsInterests } from './interestsActions';
import { updateCurrentUser } from './userActions';

export const fetchListings = (farmerId, routerProps) => {
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
                type: "ADD_OPEN_LISTINGS",
                listings: json.data
            });
            farmerId && routerProps.history.push(`/farmers/${farmerId}/listings`);
        });
    }
}

export const createListing = (payload, userId, routerProps) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTING"})
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
                dispatch(updateCurrentUser(userId));
                routerProps.history.push(`/listings/${json.data.id}`);
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
        dispatch({type: "LOADING_LISTING"})
        fetch(`http://localhost:3000/api/v1/listings/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "ADD_LISTING",
                listing: json.data
            });
        })
    }
}

export const fetchUserInterestsListings = (id) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTINGS"});
        fetch(`http://localhost:3000/api/v1/listings?id=${id}&type=interests`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "ADD_USER_INTERESTS_LISTINGS",
                listings: json.data
            });
        });
    }
}

export const fetchMyInterestsListings = (id) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTINGS"});
        fetch(`http://localhost:3000/api/v1/listings?id=${id}&type=interests`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "ADD_USER_INTERESTS_LISTINGS_COUNT",
                listings: json.data
            });
        });
    }
}

export const editListing = (listingId, payload, fetchInterestsListings, ownProps) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTING"});
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
                fetchInterestsListings && dispatch(fetchListingsInterests());
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

export const addUserListingInterest = (currentUserId, listingId) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTING"});
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
                type: "ADD_USER_INTEREST_TO_LISTING",
                listing: json.data
            })
            dispatch(fetchListingsInterests());
            dispatch(fetchMyInterestsListings(currentUserId));
        })
    }
}

export const removeUserListingInterest = (listingId, payload) => {
    return (dispatch) => {
        dispatch({type: "LOADING_LISTING"});
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
                type: "REMOVE_USER_INTEREST_ON_LISTING",
                listing: json.data
            });
            dispatch(fetchListingsInterests());
            dispatch(fetchMyInterestsListings(payload.listing.currentUserId));
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
                type: "ADD_USER_CLOSED_LISTINGS",
                listings: json.data
            });
        })
    }
}

export const listingsRendered = () => {
    return (dispatch) => {
        dispatch({type: "LISTINGS_RENDERED_TRUE"})
    }
}

export const listingsUnrendered = () => {
    return (dispatch) => {
        dispatch({type: "LISTINGS_RENDERED_FALSE"})
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
                    type: "REFRESH_USER",
                    user: json.user
                });
                dispatch(fetchListings());
            } else {
                console.log(json)
            }
        });
    }
}