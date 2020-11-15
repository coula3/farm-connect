import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar = (props) => {
    const handleFetchListings = () => {
        if(!props.areOpenListingsRendered){
            props.listingsRendered();
            props.fetchListings();
        }
    }

    const handleFetchClosedUserListings = () => {
        if(props.areOpenListingsRendered){
            props.listingsUnrendered();
            props.fetchUserClosedListings(props.userId);
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
                    <p><Link to="/listings/other-farmers" onClick={handleFetchListings}>Other Farmers</Link></p>
                    <br />
                    <span id="header_color"><strong>My Listings</strong></span>
                    <p><Link to={`/users/${props.userId}/listings`} onClick={handleFetchListings}>Open</Link></p>
                    <p><Link to={`/users/${props.userId}/closed-listings`} onClick={handleFetchClosedUserListings}>Closed</Link></p>
                </>
            )
        }
    }

    return (
        <div>
            <div className="SideNavBar_main_div">
                <br />
                <p><Link to={`/users/${props.userId}`}>Profile</Link></p>
                <br />
                {createListing()}
                <p><Link to="/listings" onClick={handleFetchListings}>Listings</Link></p>
                { renderFarmerUsersLinks() }
                <br />
                <p><Link to="/signout" onClick={props.userSignOut} >Sign Out</Link></p>
            </div>
        </div>
    )
}

export default withRouter(SideNavBar);