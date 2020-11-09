import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const SideNavBar = (props) => {
    const renderFarmerUsersLinks = () => {
        if(props.userAttributes.type === "Farmer"){
            return (
                <>
                    <p><Link to="/listings/other-farmers">Listings - Others</Link></p>
                    <br />
                    <span>My Listing</span>
                    <p><Link to={`/users/${props.userId}/listings`}>Open</Link></p>
                    <p><Link to={`/users/${props.userId}/closed-listings`} onClick={() => props.fetchUserClosedListings(props)}>Closed</Link></p>
                    <br />
                    <p><Link to="/listings/new">Create Listing</Link></p>
                </>
            )
        }
    }

    return (
        <div>
            <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
                <br />
                <p><Link to="/listings">Listings</Link></p>
                { renderFarmerUsersLinks() }
                <br />
                <p><Link to={`/users/${props.userId}`}>Profile</Link></p>
                <p><Link to={`/users/${props.userId}/edit`}>Edit Profile</Link></p>
                <br />
                <p><Link to="/signout" onClick={props.userSignOut} >Sign Out</Link></p>
            </div>
        </div>
    )
}

export default withRouter(SideNavBar);