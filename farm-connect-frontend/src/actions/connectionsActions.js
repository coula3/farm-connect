export const fetchMyConnects = (id) => {
    return (dispatch) => {
        dispatch({type: "LOADING_CONNECTS"});
        fetch(`http://localhost:3000/api/v1/connections?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "ADD_USER_CONNECTS",
                userConnects: json.data
            });
        })
    }
}