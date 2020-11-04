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
                dispatch({
                    type: "SIGN_UP_OR_LOGIN_FAILURE",
                    messages: json.messages
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
                dispatch({
                    type: "SIGN_UP_OR_LOGIN_FAILURE",
                    messages: json.messages
                });
                ownProps.history.push("/");
            }
        })
    }
}

export const editUser = (userId, payload, ownProps) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"});
        fetch(`http://localhost:3000/api/v1/users/${userId}`, {
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
                type: "EDIT_USER",
                user: json.data
            });
            ownProps.history.push(`/users/${userId}`)
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
                user: json.data
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
                user: json.data
            });
        })
    }
}

export const clearErrorMessages = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_ERROR_MESSAGES"})
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        dispatch({type: "SIGN_OUT"});
        localStorage.removeItem('jwt_token');
    }
}