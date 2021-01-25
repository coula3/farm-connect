import history from '../utils/history';

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
            if(object.user){
                dispatch({
                    type: "FETCH_FARMER",
                    farmer: object.user.data,
                    photo: object.photo
                });
                history.push(`/farmers/${id}`)
            } else {
                history.replace("/error-messages");
                dispatch({
                    type: "ADD_FARMER_ERR_MESSAGE",
                    errMessage: `Farmer ID: ${id} is invalid`
                })
            }
        })
    }
}