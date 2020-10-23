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
                console.log(json.user)
            } else {
                dispatch({type: "SIGN_UP_OR_LOGIN_FAILURE"});
                console.log(json)
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
                    user: json.user
                });
                localStorage.setItem('jwt_token', json.jwt);
                ownProps.history.push(`/listings`);
                console.log(json.user)
            } else {
                dispatch({type: "SIGN_UP_OR_LOGIN_FAILURE"})
                console.log(json)
            }
        })
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        dispatch({type: "SIGN_OUT"});
        localStorage.removeItem('jwt_token');
    }
}