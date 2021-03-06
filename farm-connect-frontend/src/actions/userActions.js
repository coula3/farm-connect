import * as actionTypes from '../actionTypes';
import { fetchListings } from './listingsActions';
import { setFocusSignIn } from '../utils/errorsUtils/userErrors';

export const signUpUser = (payload, routerProps) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/users`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
             },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(object => {
            if(object.jwt){
                dispatch({
                    type: actionTypes.SIGN_UP_OR_LOGIN_SUCCESS,
                    user: object.user
                });
                localStorage.setItem('jwt_token', object.jwt);
                routerProps.history.push(`/listings`);
            } else {
                dispatch({ type: actionTypes.SIGN_UP_OR_LOGIN_FAILURE});
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: object.messages
                });
            }
        })
    }
}

export const signInUser = (payload, routerProps) => {
    return (dispatch) => {
        if(!payload.user.email || !payload.user.password){
            dispatch({
                type: actionTypes.ADD_ERROR_MESSAGES,
                errorMessages: "email and password required"
            })
            setFocusSignIn();
        } else {
            dispatch({type: actionTypes.LOADING_USER});
            fetch(`http://localhost:3000/api/v1/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(object => {
                if(object.jwt){
                    dispatch({
                        type: actionTypes.SIGN_UP_OR_LOGIN_SUCCESS,
                        user: object.user,
                        photo: object.photo
                    });
                    localStorage.setItem('jwt_token', object.jwt);
                    routerProps.history.push(`/listings`);
                } else {
                    dispatch({type: actionTypes.SIGN_UP_OR_LOGIN_FAILURE});
                    dispatch({
                        type: actionTypes.ADD_ERROR_MESSAGES,
                        errorMessages: object.messages
                    });
                    setFocusSignIn();
                }
            })
        }
    }
}

export const editUser = (userId, payload, routerProps) => {
    const {firstName, lastName, dateOfBirth, email} = payload.user;
    const bodyData = {
        user: {firstName, lastName, dateOfBirth, email}
    };

    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(object => {
            if(object.user){
                dispatch({
                    type: actionTypes.EDIT_USER,
                    user: object.user
                });
                dispatch(fetchListings());
                if(!payload.user.photo.name){
                    routerProps.history.push(`/users/${userId}`);
                } else {
                    dispatch(uploadPhoto(payload.user.photo, userId, routerProps));
                }
            } else {
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: object.messages
                });
            }
        })
    }
}

export const uploadPhoto = (photo, userId, routerProps) => {
    const formData = new FormData();
    formData.append('file', photo);

    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/photos/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.ADD_USER_PHOTO,
                user: object.user,
                photo: object.photo
            });
            routerProps.history.push(`/users/${userId}`);
        })
    }
}

export const updateCurrentUser = (userId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.UPDATE_CURRENT_USER,
                user: object.user,
                photo: object.photo
            });
        })
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('jwt_token');
        dispatch({type: actionTypes.SIGN_OUT});
        dispatch({type: actionTypes.CLEAR_LISTINGS});
        dispatch({type: actionTypes.CLEAR_COMMODITIES});
        dispatch({type: actionTypes.CLEAR_FARMER});
        dispatch({type: actionTypes.CLEAR_PROSPECTS});
        dispatch({type: actionTypes.CLEAR_INTERESTS});
        dispatch({type: actionTypes.CLEAR_CONNECTIONS});
        dispatch({type: actionTypes.CLEAR_ERROR_MESSAGES});
    }
}