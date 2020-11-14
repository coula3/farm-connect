import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
                    <span style={{color:"#3a5f0b"}}><strong>My Listings</strong></span>
                    <p><Link to={`/users/${props.userId}/listings`} onClick={handleFetchListings}>Open</Link></p>
                    <p><Link to={`/users/${props.userId}/closed-listings`} onClick={handleFetchClosedUserListings}>Closed</Link></p>
                </>
            )
        }
    }

    return (
        <div>
            <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
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