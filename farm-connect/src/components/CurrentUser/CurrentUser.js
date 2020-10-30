import React from 'react';

const CurrentUser = (props) => {
    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            <p><label>ID: </label>{props.userId}</p>
            <p><label>Date of Birth: </label>{props.userAttributes.date_of_birth.slice(0, 10)}</p>
            <p><label>eMail: </label>{props.userAttributes.email}</p>
            <br />
            <p><label>Joined: </label>{props.userAttributes.created_at.slice(0, 10)}</p>
        </div>
    )
}

export default CurrentUser;