export const fetchProspects = (userId) => {
  return (dispatch) => {
    dispatch({type: "LOADING_PROSPECTS"});
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
        type: "FETCH_PROSPECTS",
        prospects: object.data
      })
    })
  }
}

export const fetchProspect = (id) => {
  return (dispatch) => {
    dispatch({type: "LOADING_PROSPECT"});
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
        type: "FETCH_PROSPECT",
        prospect: object.data
      });
    })
  }
}