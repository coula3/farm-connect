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
        .then(object => {
            dispatch({
                type: "ADD_OPEN_LISTINGS",
                listings: object.data
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
        .then(object => {
            if(object.data){
                dispatch({
                    type: "CREATE_NEW_LISTING",
                    listing: object.data
                });
                dispatch(fetchListings());
                dispatch(updateCurrentUser(userId));
                routerProps.history.push(`/listings/${object.data.id}`);
            } else {
                dispatch({
                    type: "ADD_ERROR_MESSAGES",
                    errorMessages: object.messages
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
        .then(object => {
            dispatch({
                type: "ADD_LISTING",
                listing: object.data
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
        .then(object => {
            dispatch({
                type: "ADD_USER_INTERESTS_LISTINGS",
                listings: object.data
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
        .then(object => {
            dispatch({
                type: "ADD_USER_INTERESTS_LISTINGS_COUNT",
                listings: object.data
            });
        });
    }
}

export const editListing = (listingId, payload, fetchInterestsListings, routerProps) => {
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
        .then(object => {
            if(object.data){
                dispatch({
                    type: "EDIT_LISTING",
                    listing: object.data
                });
                fetchInterestsListings && dispatch(fetchListingsInterests());
                routerProps.history.push(`/listings/${listingId}`);
            } else {
                dispatch({
                    type: "ADD_ERROR_MESSAGES",
                    errorMessages: object.messages
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
        .then(object => {
            dispatch({
                type: "ADD_USER_INTEREST_TO_LISTING",
                listing: object.data
            })
            dispatch(fetchListingsInterests());
            dispatch(fetchMyInterestsListings(currentUserId));
        })
    }
}

export const removeUserListingInterest = (listingId, interestId, currentUserId) => {
    const payload = {listing: {interestId: interestId, currentUserId: currentUserId}};

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
        .then(object => {
            dispatch({
                type: "REMOVE_USER_INTEREST_ON_LISTING",
                listing: object.data
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
        .then(object => {
            dispatch({
                type: "ADD_USER_CLOSED_LISTINGS",
                listings: object.data
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
        .then(object => {
            if(object.user){
                dispatch({type: "RESET_DELETING"});
                dispatch({
                    type: "REFRESH_USER",
                    user: object.user
                });
                dispatch(fetchListings());
            } else {
                console.log(object)
            }
        });
    }
}