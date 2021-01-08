export const fetchFarmer = (id) => {
    return (dispatch) => {
        dispatch({type: "LOADING_FARMER"})
        fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: "FETCH_FARMER",
                farmer: object.user.data,
                photo: object.photo
            });
        })
    }
}