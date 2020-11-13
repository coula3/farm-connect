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
                ownProps.history.push("/");
            }
        })
    }
}

export const editUser = (userId, payload, ownProps) => {
    const bodyData = {
        user: {
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            dateOfBirth: payload.user.dateOfBirth,
            email: payload.user.email
        }
    }

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
                if(!payload.user.photo.name){
                    ownProps.history.push(`/users/${userId}`);
                } else {
                    dispatch(uploadPhotos(payload.user.photo, userId, ownProps));
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

export const uploadPhotos = (photo, userId, ownProps) => {
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

export const connectUsers = (currentUserId, connectId) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/users/${currentUserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({connectId: connectId})
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "CONNECT_USERS",
                user: json.user
            });
        })
    }
}

export const unConnectUsers = (currentUserId, connectId) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/users/${currentUserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({connectId: connectId})
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "UNCONNECT_USERS",
                user: json.user
            });
        })
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        dispatch({type: "SIGN_OUT"});
        localStorage.removeItem('jwt_token');
    }
}