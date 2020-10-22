import React from 'react';
import { Link } from 'react-router-dom';

const SideNavBar = (props) => {
    const renderCreateListingLink = () => {
        if(props.userAttributes.type === "Farmer"){
            return (
                <p><Link to="/listings/new">Create Listing</Link></p>
            )
        }
    }

    return (
        <div>
            <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
                <br />
                <p><Link to="/main">Home</Link></p>
                { renderCreateListingLink() }
                <br />
                <p><Link to="/signout" onClick={props.userSignOut} >Sign Out</Link></p>

            </div>
        </div>
    )
}

export default SideNavBar;