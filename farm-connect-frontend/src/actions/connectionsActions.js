import * as actionTypes from '../actionTypes';

export const fetchMyConnects = (id) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_CONNECTS});
        fetch(`http://localhost:3000/api/v1/connections?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.ADD_USER_CONNECTS,
                userConnects: object.data
            });
        })
    }
}

export const requestConnect = (currentUserId, connectId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/connections/${currentUserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({connectId: connectId})
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.CONNECT_USERS,
                userConnects: object.data
            });
        })
    }
}

export const acceptConnect = (currentUserId, connectId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/connections/${currentUserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({
                connectId: connectId,
                type: "accept"
            })
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.ACCEPT_CONNECT,
                userConnects: object.data
            });
        })
    }
}

export const unConnectUsers = (currentUserId, connectId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOADING_USER});
        fetch(`http://localhost:3000/api/v1/connections/${currentUserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({connectId: connectId})
        })
        .then(response => response.json())
        .then(object => {
            dispatch({
                type: actionTypes.UNCONNECT_USERS,
                userConnects: object.data
            });
        })
    }
}