import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Loader from '../../components/Loader/Loader';
import * as listingsActions from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspects } from '../../actions/prospectsActions';
import { fetchListingsInterests } from '../../actions/interestsActions';
import { fetchMyConnects} from '../../actions/connectionsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import { padIds, oneDay, paths, getFullName } from '../../utils/miscellaneousUtils';

import './Listings.css';

class Listings extends React.Component {
    state = {
        searchText: "",
        searchInputFocused: false,
        isAvailableSorted: false
    }

    componentDidMount(){
        this.props.errorMessages[0] && this.props.clearErrorMessages();
    }

    stageApplication = () => {
        this.props.fetchListings();
        this.props.fetchProspects(this.props.userId);
        this.props.fetchListingsInterests();
        this.props.fetchMyConnects(this.props.userId);
        this.props.listingsRendered();
        !this.props.commodities[0] && this.props.fetchCommodities();
        !this.props.countUserInterestsListings && this.props.fetchMyInterestsListings(this.props.userId);
    }

    componentDidUpdate(){
        localStorage.getItem('jwt_token') && this.switchListingsType();
    }

    switchListingsType = () => {
        if(!this.props.openListingsRendered && (this.props.match.path === "/listings" || this.props.match.path === "/listings/other-farmers" ||  this.props.match.path === "/users/:id/listings")){
            this.stageApplication();
        } else if(!this.props.myInterestsRendered && (this.props.openListingsRendered || this.props.closedListingsRendered) && this.props.match.path === "/listings/my-interests"){
            this.props.fetchUserInterestsListings(this.props.userId);
        } else if((this.props.openListingsRendered || this.props.myInterestsRendered) && this.props.match.path === "/users/:id/closed-listings") {
            this.props.fetchUserClosedListings(this.props.userId);
            this.props.listingsUnrendered();
        }
    }

    handleFetchListing = (id) => {
        this.props.fetchListing(id);
    }

    handleFetchListings = () => {
        if(this.props.match.path === "/listings/my-interests"){
            this.props.fetchListings();
            this.props.listingsRendered();
        }
    }

    handleFetchFarmer = (e, id) => {
        e.preventDefault();
        this.props.fetchFarmer(id);
    }

    handleDeleteListing = (id) => {
        confirmAlert({
            title: 'farmConnect',
            message: `Do you want to delete Listing ${id}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.props.deleteListing(id)
              },
              {
                label: 'No',
              }
            ]
        });
    };

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleFocus = () => {
        this.setState({
            searchInputFocused: true
        });
    }

    handleBlur = () => {
        this.setState({
            searchInputFocused: false
        });
    }

    handleSortAvailable = () => {
        this.setState({
            isAvailableSorted: !this.state.isAvailableSorted
        });
    }

    getTableHeadSearchStyles = () => {
        return this.state.searchInputFocused ? "search-styles" : null;
    }

    getAvailableStyles = () => {
        return this.state.isAvailableSorted ? "available-span" : null;
    }

    render (){
        let firstName, userId, listingsCategory, baseListings, sortedListings, listings, renderLinkToFarmerProfile;

        if(this.props.match.path === paths().USER_LISTINGS_PATH){
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.userId));
        } else if (this.props.match.path.includes("/farmers/")) {		
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.match.params.id));
        } else if (this.props.match.path.endsWith("/other-farmers")) {
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id !== parseInt(this.props.userId));
        } else if (this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH) {
            baseListings = this.props.listings;
        } else {
            baseListings = this.props.listings;
        }

        if(this.props.match.path === paths().LISTINGS_PATH){
            listingsCategory = "All Farmers";
        } else if(this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH){
            listingsCategory = "Other Farmers";
        } else if(this.props.match.path === paths().MY_INTERESTS_PATH){
            listingsCategory = "My Interests";
        }

        if(this.state.isAvailableSorted){
            sortedListings = [...baseListings].sort((a, b) => b.attributes.available - a.attributes.available);
        } else {
            sortedListings = [...baseListings].sort((a, b) =>   b.id - a.id);
        }

        const searchText = this.state.searchText.toLowerCase().trim();

        if(this.state.searchText && (this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH || this.props.match.path === paths().MY_INTERESTS_PATH)){
            listings = [...sortedListings].filter(listing => (listing.attributes.date.includes(searchText) || listing.attributes.commodity.name.toLowerCase().includes(searchText) || (listing.attributes.user.first_name + " " + listing.attributes.user.last_name).toLowerCase().includes(searchText)));
        } else if(this.state.searchText && (this.props.match.path !== paths().LISTINGS_PATH || this.props.match.path !== paths().OTHER_FARMERS_LISTINGS_PATH)){
            listings = [...sortedListings].filter(listing => (listing.attributes.date.includes(searchText) || listing.attributes.commodity.name.toLowerCase().includes(searchText)));
        } else {
            listings = sortedListings;
        }

        let searchInputPlaceholderTexts;
        if(this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH || this.props.match.path === paths().MY_INTERESTS_PATH){
            searchInputPlaceholderTexts = "search list date, commodity or farmer";
        } else {
            searchInputPlaceholderTexts = "search list date or commodity";
        }

        const renderListings = listings.map(listing => {
            const listDate = listing.attributes.date.slice(0, 10);
            firstName = listing.attributes.user.first_name;
            userId = listing.attributes.user.id;
            const commodity = listing.attributes.commodity.name;
            let available;
            listing.attributes.available ? available = "✓" : available = "";
            const viewButtonColor = parseInt(this.props.userId) === listing.attributes.user.id ? "view-user-btn-color" : "view-btn-color";
            const dateDiff = ((new Date(listing.attributes.date) - new Date(listing.attributes.closed)) / oneDay);
            const rowHighlight = listing.attributes.interests.length >= 5 ? "listings-td-g" : "listings-td";

            renderLinkToFarmerProfile = <div id="link-div"><Link to={`/farmers/${userId}`} title={`${firstName}'s Profile`} onClick={(e) => this.handleFetchFarmer(e, userId)}>{getFullName(listing.attributes.user.first_name, listing.attributes.user.last_name)}</Link></div>;

            const connectedToUser = this.props.userConnects && this.props.userConnects.filter(connect => connect[0].status === "accepted").find(connect => (listing.attributes.user_id !== parseInt(this.props.userId) && listing.attributes.user_id === connect[0].user_id) || (listing.attributes.user_id !== parseInt(this.props.userId) && listing.attributes.user_id === connect[0].connect_id));

            const renderConnectSymbol = connectedToUser ? <span id="connect-span-global"><span id="connect-span1"></span><span id="connect-span2"></span></span> : null;

            return (
                <tr key={listing.id} id={rowHighlight} className="listings-th-td" onDoubleClick={() => {this.handleFetchListing(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>
                    <td><Link to={`/listings/${listing.id}`} title="View Listing" onClick={() => this.handleFetchListing(listing.id)}>{padIds(listing.id)}</Link></td>
                    <td>{listDate}</td>
                    <td>{commodity}</td>

                    { this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH || this.props.match.path === paths().MY_INTERESTS_PATH
                        ?   <td><Link to={`/farmers/${userId}/listings`} title={`${firstName}'s Listings`} onClick={this.handleFetchListings}>{getFullName(listing.attributes.user.first_name, listing.attributes.user.last_name)}</Link>{renderConnectSymbol}</td>
                        :   null
                    }

                    { this.props.match.path !== paths().USER_CLOSED_LISTINGS_PATH ?
                        <td id="td-available" className="tooltip">{available}<span className="tooltiptext">{listing.attributes.availability.slice(0, 10)}</span></td> :
                        null
                    }

                    <td className="listings-interests">{listing.attributes.interests.length > 0 ? listing.attributes.interests.length : null}</td>

                    { this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH
                        ?   <>
                                <td>{listing.attributes.closed ? listing.attributes.closed.slice(0, 10) : null}</td>
                                <td>{(Math.floor(dateDiff * -1) + 1)}</td>
                            </>
                        :   null
                    }

                    <td className="listings-view-btn"><button id={viewButtonColor} className="listings-btn" onClick={() => {this.handleFetchListing(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>view</button></td>

                    { this.props.match.path === paths().USER_LISTINGS_PATH
                        ?   <td><button id="listing-delete-btn" onClick={() => this.handleDeleteListing(listing.id)}>X</button></td>
                        :   null
                    }
                </tr>
            );
        });

        const renderListingsTable = () => {
            return (
                <table className="listings-table">
                    <thead>
                        <tr className="listings-th-td">
                            <th>LID</th>
                            <th><span className={this.getTableHeadSearchStyles()}>List Date</span></th>
                            <th><span className={this.getTableHeadSearchStyles()}>Commodity</span></th>

                            { this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH || this.props.match.path === paths().MY_INTERESTS_PATH
                                ?   <th><span className={this.getTableHeadSearchStyles()}>Farmer</span></th>
                                :   null
                            }

                            { this.props.match.path !== paths().USER_CLOSED_LISTINGS_PATH
                                ?   <th onClick={() => this.handleSortAvailable()}><span id={this.getAvailableStyles()}>Available</span></th>
                                :   null
                            }

                            <th className="listings-interests">Interests</th>

                            { this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH
                                ?   <>
                                        <th>Closed</th>
                                        <th>Days Listed</th>
                                    </>
                                :    null
                            }
                            <th className="listings-view-btn"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListings}
                    </tbody>
                </table>
            )
        }

        return (
            <div className="Listings-main-div">
                { this.props.isLoadingListings
                    ?   <Loader />
                    :   this.props.userAttributes.listings.length === 0 && (this.props.match.path === paths().USER_LISTINGS_PATH || this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH)
                        ?   this.props.match.path === paths().USER_LISTINGS_PATH
                            ?   <>
                                    <h4>No Open Listing</h4>
                                    <span>Let's get started...!</span>
                                </>
                            :   <h4>No Closed Listing</h4>

                        :   this.props.userAttributes.listings.every(listing => listing.closed === null) && this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH
                            ?   <h4>No Closed Listing</h4>
                            :   <>
                                    <div id="listings-header">
                                            <h3 id="category">{listingsCategory}</h3>

                                            { this.props.match.path.endsWith(":id/listings") || this.props.match.path.endsWith(":id/closed-listings")
                                                ?   renderLinkToFarmerProfile
                                                :   null
                                            }

                                            { this.props.match.path !== paths().USER_CLOSED_LISTINGS_PATH
                                                ?   this.props.listings.length > 0
                                                    ?   <h4>{renderListings.length} {renderListings.length > 1 ? "Open Listings" : "Open Listing" }</h4>
                                                    :   <h4>No Open Listing</h4>

                                                :   this.props.listings.length > 0
                                                    ?   <h4>{renderListings.length} {renderListings.length > 1 ? "Closed Listings" : "Closed Listing" }</h4>
                                                    :   <h4>No Closed Listing</h4>
                                            }

                                            { !this.props.listings[0]
                                                ? null
                                                : <input id="listings-search-input" type="search" placeholder={searchInputPlaceholderTexts} value={this.state.searchText} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} />
                                            }
                                    </div>

                                    <div id="listings-main">
                                        {this.props.listings[0] && renderListingsTable()}
                                    </div>
                                </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        isLoadingListings: state.listings.isLoadingListings,
        listings: state.listings.listings,
        commodities: state.commodities.commodities,
        listing: state.listings.listing,
        errorMessages: state.errorMessages.errorMessages,
        openListingsRendered: state.listings.openListingsRendered,
        closedListingsRendered: state.listings.closedListingsRendered,
        myInterestsRendered: state.listings.myInterestsRendered,
        countUserInterestsListings: state.listings.countUserInterestsListings,
        userConnects: state.connects.userConnects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchListings: () => dispatch(listingsActions.fetchListings()),
        fetchCommodities: () => dispatch(fetchCommodities()),
        fetchListing: (id) => dispatch(listingsActions.fetchListing(id)),
        fetchFarmer: (id) => dispatch(fetchFarmer(id)),
        fetchProspects: (userId) => dispatch(fetchProspects(userId)),
        fetchListingsInterests: () => dispatch(fetchListingsInterests()),
        clearErrorMessages: () => dispatch(clearErrorMessages()),
        fetchUserClosedListings: (userId) => dispatch(listingsActions.fetchUserClosedListings(userId)),
        fetchUserInterestsListings: (userId) => dispatch(listingsActions.fetchUserInterestsListings(userId)),
        fetchMyInterestsListings: (userId) => dispatch(listingsActions.fetchMyInterestsListings(userId)),
        fetchMyConnects: (userId) => dispatch(fetchMyConnects(userId)),
        listingsRendered: () => dispatch(listingsActions.listingsRendered()),
        listingsUnrendered: () => dispatch(listingsActions.listingsUnrendered()),
        deleteListing: (listingId) => dispatch(listingsActions.deleteListing(listingId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);