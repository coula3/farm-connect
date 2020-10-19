import React from 'react';
import { Link } from 'react-router-dom';

const SideNavBar = (props) => {
    return (
        <div>
            <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
                <br />
                <p><Link to="/main">Home</Link></p>
                <p><Link to="/user">Profile</Link></p>
                <br />
                <p><Link to="/signout" onClick={props.userSignOut} >Sign Out</Link></p>
            </div>
        </div>
    )
}

export default SideNavBar;