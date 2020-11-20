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

    const totalConnects = props.userAttributes.connects.length + props.userAttributes.inverse_connects.length;

    const createListing = () => {
        if(props.userAttributes.type === "Farmer"){
            return <p><Link to="/listings/new">Create Listing</Link></p>
        }
    }
    const renderFarmerUserLinks = () => {
        if(props.userAttributes.type === "Farmer"){
            return (
                <div id="farmers_view_padding" className="listings_panel">
                    <p id="oth_farmer_p"><Link to="/listings/other-farmers" onClick={handleFetchListings}>Other Farmers</Link></p>
                    <br />
                    <span id="my_listings_span"><strong>My Listings</strong></span>
                    <p><Link to={`/users/${props.userId}/listings`} onClick={handleFetchListings}>Open</Link></p>
                    <p><Link to={`/users/${props.userId}/closed-listings`} onClick={handleFetchClosedUserListings}>Closed</Link></p>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="SideNavBar_main_div">
                <br />
                <p><Link to={`/users/${props.userId}`}>Profile</Link></p>
                <br />
                <div id="create_listings_listings_padding" className="listings_panel">
                    {createListing()}
                    <p id="listings_link_p"><Link to="/listings" onClick={handleFetchListings}>Listings</Link></p>
                </div>
                { renderFarmerUserLinks() }
                <br />
                <p><Link to="#" id="my_connect_link">My Connects</Link><span id="my_connect_span">{totalConnects}</span></p>
                <br />
                <p id="signout_p"><Link to="/signout" onClick={props.userSignOut} >Sign Out</Link></p>
            </div>
        </div>
    )
}

export default withRouter(SideNavBar);