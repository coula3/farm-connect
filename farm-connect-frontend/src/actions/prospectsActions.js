import * as actionTypes from '../actionTypes';

export const fetchProspects = (userId) => {
  return (dispatch) => {
    dispatch({type: actionTypes.LOADING_PROSPECTS});
    fetch(`http://localhost:3000/api/v1/prospects?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    .then(response => response.json())
    .then(object => {
      dispatch({
        type: actionTypes.FETCH_PROSPECTS,
        prospects: object.data
      })
    })
  }
}

export const fetchProspect = (id) => {
  return (dispatch) => {
    dispatch({type: actionTypes.LOADING_PROSPECT});
    fetch(`http://localhost:3000/api/v1/prospects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    .then(response => response.json())
    .then(object => {
      dispatch({
        type: actionTypes.FETCH_PROSPECT,
        prospect: object.data
      });
    })
  }
}