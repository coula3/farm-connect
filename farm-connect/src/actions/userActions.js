export const signInUser = (payload, ownProps) => {
    return (dispatch) => {
        dispatch({type: "LOADING"});
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
                    type: "LOGIN_SUCCESS",
                    user: json.user
                });
                localStorage.setItem('jwt_token', json.jwt);
                ownProps.history.push(`/main`);
                console.log(json.user)
            } else {
                dispatch({type: "LOGIN_FAILURE"})
                console.log(json)
            }
        })
    }
}

export const signOutUser = () => {
    return (dispatch) => {
        dispatch({type: "SIGN_OUT_USER"});
        localStorage.removeItem('jwt_token');
    }
}