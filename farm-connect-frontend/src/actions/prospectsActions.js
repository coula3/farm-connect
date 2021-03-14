import * as actionTypes from '../actionTypes';
import history from '../utils/history';

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

export const fetchProspect = (id, routerProps) => {
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
      if(object.prospect){
        dispatch({
          type: actionTypes.FETCH_PROSPECT,
          prospect: object.prospect.data
        });
        routerProps ? routerProps.history.push(`/prospects/${id}`) : history.push(`/prospects/${id}`);
      } else {
        dispatch({
          type: actionTypes.ADD_ERROR_MESSAGES,
          errorMessages: [`Invalid Prospect ID: ${id}`]
        });
        dispatch({type: actionTypes.CLEAR_LOADING_PROSPECT});
        routerProps ? routerProps.history.replace("/error-messages") : history.replace("/error-messages");
      }
    })
  }
}