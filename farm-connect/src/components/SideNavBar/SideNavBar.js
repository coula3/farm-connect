import React from 'react';
import { Link } from 'react-router-dom';

const SideNavBar = () => {
    return (
        <div>
            <div style={{width: "15%", display: "inline", float: "left"}}>
                    <Link to="/user-profile">User Profile</Link>
                </div>
        </div>
    )

}

export default SideNavBar;