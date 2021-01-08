import { fetchListings } from './listingsActions';
import { setFocusSignIn } from '../utils/errorsUtils/userErrors';

export const signUpUser = (payload, ownProps) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/users`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
             },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(json => {
            if(json.jwt){
                dispatch({
                    type: "SIGN_UP_OR_LOGIN_SUCCESS",
                    user: json.user
                });
                localStorage.setItem('jwt_token', json.jwt);
                ownProps.history.push(`/listings`);
            } else {
                dispatch({ type: "SIGN_UP_OR_LOGIN_FAILURE"});
                dispatch({
                    type: "ADD_ERROR_MESSAGES",
                    errorMessages: json.messages
                });
            }
        })
    }
}

export const signInUser = (payload, ownProps) => {
    return (dispatch) => {
        if(!payload.user.email || !payload.user.password){
            dispatch({
                type: "ADD_ERROR_MESSAGES",
                errorMessages: "email and password required"
            })
            setFocusSignIn();
        } else {
            dispatch({type: "LOADING_USER"});
            fetch(`http://localhost:3000/api/v1/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(json => {
                if(json.jwt){
                    dispatch({
                        type: "SIGN_UP_OR_LOGIN_SUCCESS",
                        user: json.user,
                        photo: json.photo
                    });
                    localStorage.setItem('jwt_token', json.jwt);
                    ownProps.history.push(`/listings`);
                } else {
                    dispatch({type: "SIGN_UP_OR_LOGIN_FAILURE"});
                    dispatch({
                        type: "ADD_ERROR_MESSAGES",
                        errorMessages: json.messages
                    });
                }
            })
        }
    }
}

export const editUser = (userId, payload, ownProps) => {
    const {firstName, lastName, dateOfBirth, email} = payload.user;
    const bodyData = {
        user: {firstName, lastName, dateOfBirth, email}
    };

    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(json => {
            if(json.user){
                dispatch({
                    type: "EDIT_USER",
                    user: json.user
                });
                dispatch(fetchListings());
                if(!payload.user.photo.name){
                    ownProps.history.push(`/users/${userId}`);
                } else {
                    dispatch(uploadPhoto(payload.user.photo, userId, ownProps));
                }
            } else {
                dispatch({
                    type: "ADD_ERROR_MESSAGES",
                    errorMessages: json.messages
                });
            }
        })
    }
}

export const uploadPhoto = (photo, userId, ownProps) => {
    const formData = new FormData();
    formData.append('file', photo);

    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/photos/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "ADD_USER_PHOTO",
                user: json.user,
                photo: json.photo
            });
            ownProps.history.push(`/users/${userId}`);
        })
    }
}

export const updateCurrentUser = (userId) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: "UPDATE_CURRENT_USER",
                user: data.user,
                photo: data.photo
            });
        })
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('jwt_token');
        dispatch({type: "SIGN_OUT"});
        dispatch({type: "CLEAR_LISTINGS"});
        dispatch({type: "CLEAR_COMMODITIES"});
        dispatch({type: "CLEAR_FARMER"});
        dispatch({type: "CLEAR_PROSPECTS"});
        dispatch({type: "CLEAR_INTERESTS"});
        dispatch({type: "CLEAR_CONNECTIONS"});
        dispatch({type: "CLEAR_ERROR_MESSAGES"});
    }
}