export const fetchListings = () => {
 return (dispatch) => {
    dispatch({type: "LOADING_LISTINGS"});
    fetch(`http://localhost:3000/api/v1/listings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(json => {
        dispatch({
            type: "FETCH_LISTINGS",
            listings: json.data
        });
        console.log(json)
        });
    }
}