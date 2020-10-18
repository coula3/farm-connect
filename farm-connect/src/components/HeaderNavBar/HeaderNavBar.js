import React from 'react';
import { Link } from 'react-router-dom'

const HeadNavBar = (props) => {
    return (
        <div style={{marginBottom:"15px"}}>
            <span style={{marginRight: "15px"}}>{props.userAttributes.first_name} {props.userAttributes.last_name}</span>
            <Link onClick={props.userSignOut} to="/signout">Sign Out</Link>
        </div>
    )
}

export default HeadNavBar;