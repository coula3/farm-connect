export const fetchProspects = () => {
    return (dispatch) => {
        dispatch({type: "LOADING_PROSPECTS"});
        fetch(`http://localhost:3000/api/v1/prospects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          }
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "FETCH_PROSPECTS",
                prospects: json.data
            })
        })
    }
}