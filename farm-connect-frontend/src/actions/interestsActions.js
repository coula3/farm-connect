import * as actionTypes from '../actionTypes';

export const fetchListingsInterests = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_LISTINGS_INTERESTS});
        fetch(`http://localhost:3000/api/v1/interests`, {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.FETCH_LISTINGS_INTERESTS,
                listingsInterests: object.interests
            });
        })
    }
}