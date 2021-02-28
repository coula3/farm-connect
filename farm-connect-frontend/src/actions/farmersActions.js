import * as actionTypes from '../actionTypes';
import history from '../utils/history';

export const fetchFarmer = (id) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_FARMER})
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
                    type: actionTypes.FETCH_FARMER,
                    farmer: object.user.data,
                    photo: object.photo
                });
                history.push(`/farmers/${id}`)
            } else {
                history.replace("/error-messages");
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: [`Farmer ID: ${id} is invalid`]
                })
            }
        })
    }
}