import * as actionTypes from '../actionTypes';
import history from '../utils/history';

export const fetchFarmer = (id, routerProps) => {
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

                if(routerProps || history){
                    routerProps ? routerProps.history.push(`/farmers/${id}`) : history.push(`/farmers/${id}`);
                }
            } else {
                dispatch({
                    type: actionTypes.ADD_ERROR_MESSAGES,
                    errorMessages: [`Invalid Farmer ID: ${id}`]
                });
                history.replace("/error-messages");
                dispatch({type: actionTypes.CLEAR_LOADING_FARMER});
            }
        })
    }
}