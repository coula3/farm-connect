import * as actionTypes from '../actionTypes';
import { fetchListingsInterests } from './interestsActions';
import { updateCurrentUser } from './userActions';
import history from '../utils/history';

export const fetchListings = (farmerId, routerProps) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTINGS});
        fetch(`http://localhost:3000/api/v1/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.ADD_OPEN_LISTINGS,
                listings: object.data
            });

            farmerId && routerProps && routerProps.history.push(`/farmers/${farmerId}/listings`);
            farmerId && history.push(`/farmers/${farmerId}/listings`);
        });
    };
}

export const createListing = (payload, userId, routerProps) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTING})
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
                    type: actionTypes.CREATE_NEW_LISTING,
                    listing: object.data
                });
                dispatch(fetchListings());
                dispatch(updateCurrentUser(userId));
                routerProps.history.push(`/listings/${object.data.id}`);
            } else {
                dispatch({type: actionTypes.CLEAR_LOADING});
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: object.messages
                });
            }
        })
    }
}

export const fetchListing = (id, routerProps) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTING})
        fetch(`http://localhost:3000/api/v1/listings/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            if(object.listing){
                dispatch({
                    type: actionTypes.ADD_LISTING,
                    listing: object.listing.data
                });

                if(!window.location.href.includes("/listings/")){
                    routerProps.history.push(`/listings/${id}`);
                }
            } else {
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: [`${object.message}`]
                });
                history.replace("/error-messages");
                dispatch({type: actionTypes.CLEAR_LOADING});
            }
        })
    }
}

export const fetchUserInterestsListings = (id) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTINGS});
        fetch(`http://localhost:3000/api/v1/listings?id=${id}&type=interests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.ADD_USER_INTERESTS_LISTINGS,
                listings: object.data
            });
        });
    }
}

export const fetchMyInterestsListings = (id) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTINGS});
        fetch(`http://localhost:3000/api/v1/listings?id=${id}&type=interests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.ADD_USER_INTERESTS_LISTINGS_COUNT,
                listings: object.data
            });
        });
    }
}

export const editListing = (listingId, payload, fetchInterestsListings, routerProps) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTING});
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
                    type: actionTypes.EDIT_LISTING,
                    listing: object.data
                });
                fetchInterestsListings && dispatch(fetchListingsInterests());
                routerProps.history.push(`/listings/${listingId}`);
            } else {
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: object.messages
                });
                dispatch({type: actionTypes.CLEAR_LOADING});
            }
        })
    }
}

export const addUserListingInterest = (currentUserId, listingId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTING});
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
                type: actionTypes.ADD_USER_INTEREST_TO_LISTING,
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
        dispatch({type: actionTypes.LOADING_LISTING});
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
                type: actionTypes.REMOVE_USER_INTEREST_ON_LISTING,
                listing: object.data
            });
            dispatch(fetchListingsInterests());
            dispatch(fetchMyInterestsListings(payload.listing.currentUserId));
        })
    }
}

export const fetchUserClosedListings = (userId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTINGS});
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
                type: actionTypes.ADD_USER_CLOSED_LISTINGS,
                listings: object.data
            });
        })
    }
}

export const listingsRendered = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.LISTINGS_RENDERED_TRUE})
    }
}

export const listingsUnrendered = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.LISTINGS_RENDERED_FALSE})
    }
}

export const deleteListing = (listingId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.DELETING_LISTING});
        fetch(`http://localhost:3000/api/v1/listings/${listingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            if(object.user){
                dispatch({type: actionTypes.RESET_DELETING});
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