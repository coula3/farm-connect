import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { paths } from '../../utils/miscellaneousUtils';
import './SideNavBar.css';

const SideNavBar = (props) => {
    const totalConnects = !props.userConnects ? 0 : props.userConnects.filter(connect => connect[0].status === "accepted").length;
    const totalConnectRequests = !props.userConnects ? 0 : props.userConnects.filter(connect => connect[0].status === "pending" && connect[0].user_id !== parseInt(props.userId)).length;
    const totalInterests = props.countUserInterestsListings;

    const handleFetchListings = () => {
        if(!props.openListingsRendered || props.hasListingChanged){
            props.fetchListings();
            props.fetchListingsInterests();
            props.listingsRendered();
        }
    }

    const handleFetchClosedUserListings = () => {
        if(props.openListingsRendered || props.myInterestsRendered){
            props.fetchUserClosedListings(props.userId);
            props.fetchListingsInterests();
            props.listingsUnrendered();
        }
    }

    const handleFetchUserInterestsListings = (userId) => {
        if(!props.myInterestsRendered || props.hasListingChanged){
            props.fetchUserInterestsListings(userId);
        }
    }

    const handleRemoveMsgHeader = () => {
        const msgHeader = document.getElementById("no_msg");
        if(msgHeader){
            msgHeader.remove();
        }
    }

    const renderCreateListing = () => {
        if(props.userAttributes.type === "Farmer"){
            return <p><Link to={paths().NEW_LISTING_PATH}>Create Listing</Link></p>
        }
    }

    const renderFarmerUserLinks = () => {
        if(props.userAttributes.type === "Farmer"){
            return (
                <div id="farmers_view_padding" className="listings_panel">
                    <p id="oth_farmer_p"><Link to={paths().OTHER_FARMERS_LISTINGS_PATH} onClick={handleFetchListings}>Other Farmers</Link></p>
                    <br />
                    <h4 id="my_listings_span"><strong>My Listings</strong></h4>
                    <p><Link to={`/users/${props.userId}/listings`} onClick={handleFetchListings}>Open</Link></p>
                    <p><Link to={`/users/${props.userId}/closed-listings`} onClick={handleFetchClosedUserListings}>Closed</Link></p>
                </div>
            )
        }
    }

    const renderMyConnectsLink = () => {
        if(totalConnects === 0){
            return <p className="my_connects_tags">My Connects<span id="my_connect_space_span"></span><span className="my_connects_span">{totalConnects}</span></p>
        } else {
            return <p><Link to="/my-connects" className="my_connects_tags">My Connects</Link><span className="my_connects_span">{totalConnects}</span></p>
        }
    }

    return (
        <div>
            <div className="SideNavBar_main_div">
                <br />
                <p><Link to={`/users/${props.userId}`}>Profile</Link></p>
                <br />

                <div id="create_listings_listings_padding" className="listings_panel">
                    {renderCreateListing()}
                    <p id="listings_link_p"><Link to={paths().LISTINGS_PATH} onClick={handleFetchListings}>Listings</Link></p>
                </div>

                { renderFarmerUserLinks() }

                <br />
                { renderMyConnectsLink() }
                {   totalConnectRequests
                    ? <p><Link to="/connect-requests" className="requests_interests_links">Connect Requests</Link><span className="requests_interests_spans">{totalConnectRequests}</span></p>
                    : null
                }
                <p><Link to="/listings/my-interests" className="requests_interests_links" onClick={() => handleFetchUserInterestsListings(props.userId)}>My Interests</Link><span className="requests_interests_spans">{totalInterests}</span></p>

                <h4 id="search_h4">Search</h4>
                <p id="search_links_p"><Link to="/users/search-farmers" onClick={handleRemoveMsgHeader}>Farmers</Link> | <Link to="/users/search-prospects" onClick={handleRemoveMsgHeader}>Prospects</Link></p>

                <br />
                <p id="signout_p"><Link to={paths().SIGNOUT_PATH} onClick={props.userSignOut} >Sign Out</Link></p>
            </div>
        </div>
    )
}

export default withRouter(SideNavBar);