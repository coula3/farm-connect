import * as actionTypes from '../actionTypes';

export const fetchCommodities = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_COMMODITIES});
        fetch(`http://localhost:3000/api/v1/commodities`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.FETCH_COMMODITIES,
                commodities: object.data
            });
        })
    }
}
