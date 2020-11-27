import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import * as listingsActions from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspects } from '../../actions/prospectsActions';
import { fetchListingsInterests } from '../../actions/interestsActions';
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
        this.stageApplication();
        !this.props.commodities[0] && this.props.fetchCommodities();
        this.props.errorMessages[0] && this.props.clearErrorMessages();
    }

    stageApplication = () => {
        if(!this.props.areOpenListingsRendered && this.props.match.path !== "/users/:id/closed-listings"){
            this.props.fetchListings();
            this.props.fetchProspects(this.props.userId);
            this.props.fetchListingsInterests();
            this.props.listingsRendered();
        } else if(this.props.areOpenListingsRendered && this.props.match.path === "/users/:id/closed-listings") {
            this.props.fetchUserClosedListings(this.props.userId);
            this.props.listingsUnrendered();
        }
    }

    componentDidUpdate(){
        if(!this.props.areOpenListingsRendered && this.props.match.path !== "/users/:id/closed-listings"){
            this.stageApplication();
        } else if(this.props.areOpenListingsRendered && this.props.match.path === "/users/:id/closed-listings") {
            this.props.fetchUserClosedListings(this.props.userId);
            this.props.listingsUnrendered();
        }
    }

    handleFetchListing = (id) => {
        this.props.fetchListing(id);
    }

    handleFetchFarmer = (id) => {
        this.props.fetchFarmer(id);
    }

    handleDeleteListing = (id) => {
        this.props.deleteListing(id);
    }

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
        return this.state.searchInputFocused ? "search_styles" : null;
    }

    getAvailableStyles = () => {
        return this.state.isAvailableSorted ? "available_span" : null;
    }

    render (){
        let firstName, userId, listingsCategory, baseListings, sortedListings, listings;

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
        }

        if(this.state.isAvailableSorted){
            sortedListings = [...baseListings].sort((a, b) => b.attributes.available - a.attributes.available);
        } else {
            sortedListings = [...baseListings].sort((a, b) =>   b.id - a.id);
        }

        const searchText = this.state.searchText.toLowerCase().trim();

        if(this.state.searchText && (this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH)){
            listings = [...sortedListings].filter(listing => (listing.attributes.commodity.name.toLowerCase().includes(searchText) || (listing.attributes.user.first_name + " " + listing.attributes.user.last_name).toLowerCase().includes(searchText)));
        } else if(this.state.searchText && (this.props.match.path !== paths().LISTINGS_PATH || this.props.match.path !== paths().OTHER_FARMERS_LISTINGS_PATH)){
            listings = [...sortedListings].filter(listing => (listing.attributes.commodity.name.toLowerCase().includes(searchText)));
        } else {
            listings = sortedListings;
        }

        const renderListings = listings.map(listing => {
            const listDate = listing.attributes.date.slice(0, 10);
            firstName = listing.attributes.user.first_name;
            userId = listing.attributes.user.id;
            const commodity = listing.attributes.commodity.name;
            let available;
            listing.attributes.available ? available = "✓" : available = "";
            const viewButtonColor = parseInt(this.props.userId) === listing.attributes.user.id ? "view_btn_color" : null;
            const dateDiff = ((new Date(listing.attributes.date) - new Date(listing.attributes.closed)) / oneDay);
            const rowHighlight = listing.attributes.interests.length >= 5 ? "listings_td_g" : "listings_td";

            return (
                <tr key={listing.id} id={rowHighlight} className="listings_th_td" onDoubleClick={() => {this.handleFetchListing(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>
                    <td><Link to={`/listings/${listing.id}`} title="View Listing" onClick={() => this.handleFetchListing(listing.id)}>{padIds(listing.id)}</Link></td>
                    <td>{listDate}</td>
                    <td>{commodity}</td>

                    { this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH
                        ?   <td><Link to={`/farmers/${userId}/listings`} title={`${firstName}'s Listings`}>{getFullName(listing.attributes.user.first_name, listing.attributes.user.last_name)}</Link></td>
                        :   null
                    }

                    { this.props.match.path !== paths().USER_CLOSED_LISTINGS_PATH ?
                        <td id="td_available" className="tooltip">{available}<span className="tooltiptext">{listing.attributes.availability.slice(0, 10)}</span></td> :
                        null
                    }

                    <td>{listing.attributes.interests.length > 0 ? listing.attributes.interests.length : null}</td>

                    { this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH
                        ?   <>
                                <td>{listing.attributes.closed ? listing.attributes.closed.slice(0, 10) : null}</td>
                                <td>{(Math.floor(dateDiff * -1) + 1)}</td>
                            </>
                        :   null
                    }

                    <td><button id={viewButtonColor} className="listings_btn" onClick={() => {this.handleFetchListing(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>view</button></td>

                    { this.props.match.path === paths().USER_LISTINGS_PATH
                        ?   <td><button className="listings_btn" onClick={() => this.handleDeleteListing(listing.id)}>delete</button></td>
                        :   null
                    }
                </tr>
            );
        });

        const renderListingsTable = () => {
            return (
                <table className="table">
                    <thead>
                        <tr className="listings_th_td">
                            <th></th>
                            <th>List Date</th>
                            <th><span className={this.getTableHeadSearchStyles()}>Commodity</span></th>

                            { this.props.match.path === paths().LISTINGS_PATH || this.props.match.path === paths().OTHER_FARMERS_LISTINGS_PATH
                                ?   <th><span className={this.getTableHeadSearchStyles()}>Farmer</span></th>
                                :   null
                            }

                            { this.props.match.path !== paths().USER_CLOSED_LISTINGS_PATH
                                ?   <th onClick={() => this.handleSortAvailable()}><span id={this.getAvailableStyles()}>Available</span></th>
                                :   null
                            }

                            <th>Interests</th>

                            { this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH
                                ?   <>
                                        <th>Closed</th>
                                        <th>Days Listed</th>
                                    </>
                                :    null
                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListings}
                    </tbody>
                </table>
            )
        }

        const renderLinkToFarmerProfile = <div id="link_div"><Link to={`/farmers/${userId}`} title={`${firstName}'s Profile`} onClick={() => this.handleFetchFarmer(userId)}>{getFullName(this.props.userAttributes.first_name, this.props.userAttributes.last_name)}</Link></div>;

        return (
            <div className="Listings_main_div">
                { this.props.isLoadingListings
                    ?   <Loader />
                    :   this.props.userAttributes.listings.length === 0 && (this.props.match.path === paths().USER_LISTINGS_PATH || this.props.match.path === paths().USER_CLOSED_LISTINGS_PATH)
                        ?   this.props.match.path === paths().USER_LISTINGS_PATH
                            ?   <>
                                    <h4>No Open Listing</h4>
                                    <span>Let's get started...!</span>
                                </>
                            :   <h4>No Closed Listing</h4>

                        : <>
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

                                <input id="search_input" type="text" placeholder="enter search text" value={this.state.searchText} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} />

                                {this.props.listings[0] && renderListingsTable()}
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
        areOpenListingsRendered: state.listings.areOpenListingsRendered
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
        listingsRendered: () => dispatch(listingsActions.listingsRendered()),
        listingsUnrendered: () => dispatch(listingsActions.listingsUnrendered()),
        deleteListing: (listingId) => dispatch(listingsActions.deleteListing(listingId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);