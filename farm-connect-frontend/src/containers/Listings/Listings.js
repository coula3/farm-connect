import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspects } from '../../actions/prospectsActions';
import { fetchListingsInterests } from '../../actions/interestsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import { padIds, oneDay } from '../../utils/miscellaneousUtils';
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
        if(this.props.areOpenListingsRendered || this.props.match.path !== "/users/:id/closed-listings"){
            this.props.fetchListings();
            this.props.fetchProspects(this.props.userId);
            this.props.fetchListingsInterests();
        }
    }

    componentDidUpdate(){
        if(!this.props.areOpenListingsRendered && this.props.match.path !== "/users/:id/closed-listings"){
            this.props.listingsRendered();
            this.stageApplication();
        } else if (this.props.areOpenListingsRendered && this.props.match.path === "/users/:id/closed-listings") {
            this.props.listingsUnrendered();
            this.props.fetchUserClosedListings(this.props.userId);
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
        let baseListings;

        if(this.props.match.path === "/users/:id/listings"){
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.userId));
        } else if (this.props.match.path.includes("/farmers/")) {		
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.match.params.id));
        } else if (this.props.match.path.endsWith("/other-farmers")) {
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id !== parseInt(this.props.userId));
        } else if (this.props.match.path === "/users/:id/closed-listings") {
            baseListings = this.props.listings;
        } else {
            baseListings = this.props.listings;
        }

        let firstName, fullName, userId, listingsCategory;

        if(this.props.match.path === "/listings"){
            listingsCategory = "All Farmers";
        } else if(this.props.match.path === "/listings/other-farmers"){
            listingsCategory = "Other Farmers";
        }

        let sortedListings;

        if(this.state.isAvailableSorted){
            sortedListings = [...baseListings].sort((a, b) => b.attributes.available - a.attributes.available);
        } else {
            sortedListings = [...baseListings].sort((a, b) =>   b.id - a.id);
        }

        let Listings;
        const searchText = this.state.searchText.toLowerCase().trim();

        if(this.state.searchText){
            Listings = [...sortedListings].filter(listing => (listing.attributes.commodity.name.toLowerCase().includes(searchText) || (listing.attributes.user.first_name + " " + listing.attributes.user.last_name).toLowerCase().includes(searchText)));
        } else {
            Listings = sortedListings;
        }

        const renderListings = Listings.map(listing => {
            const listDate = listing.attributes.date.slice(0, 10);
            firstName = listing.attributes.user.first_name;
            fullName = listing.attributes.user.first_name + " " + listing.attributes.user.last_name;
            userId = listing.attributes.user.id;
            const commodity = listing.attributes.commodity.name;
            let available;
            listing.attributes.available ? available = "✓" : available = "";
            const viewButton = parseInt(this.props.userId) === listing.attributes.user.id ? {backgroundColor:"#3a5f0b", color:"#FFF", borderRadius:"5px"} : null;
            const dateDiff = ((new Date(listing.attributes.date) - new Date(listing.attributes.closed)) / oneDay);
            const rowHighlight = listing.attributes.interests.length >= 5 ? "listings_td_g" : "listings_td";

            return (
                <tr key={listing.id} id={rowHighlight} className="listings_th_td" onDoubleClick={() => {this.handleFetchListing(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>
                    <td><Link to={`/listings/${listing.id}`} title="View Listing" onClick={() => this.handleFetchListing(listing.id)}>{padIds(listing.id)}</Link></td>
                    <td>{listDate}</td>
                    <td>{commodity}</td>

                    { this.props.match.path === "/listings" || this.props.match.path === "/listings/other-farmers"
                        ?   <td><Link to={`/farmers/${userId}/listings`} title={`${firstName}'s Listings`}>{fullName}</Link></td>
                        :   null
                    }

                    { this.props.match.path !== "/users/:id/closed-listings" ?
                        <td id="td_available" className="tooltip">{available}<span className="tooltiptext">{listing.attributes.availability.slice(0, 10)}</span></td> :
                        null
                    }

                    <td>{listing.attributes.interests.length > 0 ? listing.attributes.interests.length : null}</td>

                    { this.props.match.path === "/users/:id/closed-listings"
                        ?   <>
                                <td>{listing.attributes.closed ? listing.attributes.closed.slice(0, 10) : null}</td>
                                <td>{(Math.floor(dateDiff * -1) + 1)}</td>
                            </>
                        :   null
                    }

                    <td><button onClick={() => {this.handleFetchListing(listing.id); this.props.history.push(`/listings/${listing.id}`)}} style={viewButton}>view</button></td>

                    { this.props.match.path === "/users/:id/listings"
                        ?   <td><button onClick={() => this.handleDeleteListing(listing.id)}>delete</button></td>
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

                            { this.props.match.path === "/listings" || this.props.match.path === "/listings/other-farmers"
                                ?   <th><span className={this.getTableHeadSearchStyles()}>Farmer</span></th>
                                :   null
                            }

                            { this.props.match.path !== "/users/:id/closed-listings"
                                ?   <th onClick={() => this.handleSortAvailable()}><span id={this.getAvailableStyles()}>Available</span></th>
                                :   null
                            }

                            <th>Interests</th>

                            { this.props.match.path === "/users/:id/closed-listings"
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

        const renderLinkToFarmerProfile = <div id="link_div"><Link to={`/farmers/${userId}`} title={`${firstName}'s Profile`} onClick={() => this.handleFetchFarmer(userId)}>{fullName}</Link></div>;

        return (
            <div className="Listings_main_div">
                { this.props.isLoadingListings
                    ?   <Loader />
                    :   <>
                            <h3 id="category">{listingsCategory}</h3>

                            { this.props.match.path.endsWith(":id/listings") || this.props.match.path.endsWith(":id/closed-listings")
                                ?   renderLinkToFarmerProfile
                                :   null
                            }

                            { this.props.match.path !== "/users/:id/closed-listings"
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
        fetchListings: () => dispatch(actions.fetchListings()),
        fetchCommodities: () => dispatch(fetchCommodities()),
        fetchListing: (id) => dispatch(actions.fetchListing(id)),
        fetchFarmer: (id) => dispatch(fetchFarmer(id)),
        fetchProspects: (userId) => dispatch(fetchProspects(userId)),
        fetchListingsInterests: () => dispatch(fetchListingsInterests()),
        clearErrorMessages: () => dispatch(clearErrorMessages()),
        fetchUserClosedListings: (userId) => dispatch(actions.fetchUserClosedListings(userId)),
        listingsRendered: () => dispatch(actions.listingsRendered()),
        listingsUnrendered: () => dispatch(actions.listingsUnrendered()),
        deleteListing: (listingId) => dispatch(actions.deleteListing(listingId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);