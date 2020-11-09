import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const SideNavBar = (props) => {
    const handleClick = () => {
        props.listingsRendered();
        if(!props.areListingsRendered){
            props.fetchListings();
        }
    }

    const createListing = () => {
        if(props.userAttributes.type === "Farmer"){
            return <p><Link to="/listings/new">Create Listing</Link></p>
        }
    }
    const renderFarmerUsersLinks = () => {
        if(props.userAttributes.type === "Farmer"){
            return (
                <>
                    <p><Link to="/listings/other-farmers" onClick={handleClick}>Listings - Others</Link></p>
                    <br />
                    <span>My Listings</span>
                    <p><Link to={`/users/${props.userId}/listings`} onClick={handleClick}>Open</Link></p>
                    <p><Link to={`/users/${props.userId}/closed-listings`} onClick={() => {props.fetchUserClosedListings(props); props.listingsUnrendered()}}>Closed</Link></p>
                </>
            )
        }
    }

    return (
        <div>
            <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
                <br />
                {createListing()}
                <br />
                <p><Link to="/listings" onClick={handleClick}>Listings</Link></p>
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