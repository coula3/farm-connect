import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchListings, fetchListing, fetchUserClosedListings, listingsRendered, listingsUnrendered } from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspects } from '../../actions/prospectsActions';
import { fetchListingsInterests } from '../../actions/interestsActions';
import { clearErrorMessages } from '../../actions/errorActions';
import { padIds } from '../../utils/miscellaneousUtils';
import { Link } from 'react-router-dom';
import './Listings.css';

class Listings extends React.Component {
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

    handleClick = (id) => {
        this.props.fetchListing(id)
    }

    handleFetchFarmer = (id) => {
        this.props.fetchFarmer(id);
    }

    render (){
        let baseListings;

        if(this.props.match.path === "/users/:id/listings"){
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.userId))
        } else if (this.props.match.path.includes("/farmers/")) {		
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.match.params.id))
        } else if (this.props.match.path.endsWith("/other-farmers")) {
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id !== parseInt(this.props.userId))
        } else if (this.props.match.path === "/users/:id/closed-listings") {
            baseListings = this.props.listings
        } else {
            baseListings = this.props.listings
        }

        let firstName, fullName, userId, listingsCategory;

        if(this.props.match.path === "/listings"){
            listingsCategory = "All Farmers"
        } else if(this.props.match.path === "/listings/other-farmers"){
            listingsCategory = "Other Farmers"
        }

        const sortedBaseListings = baseListings.sort((a, b) => a.id - b.id)
        const listings = sortedBaseListings.map(listing => {
            const listDate = listing.attributes.date.slice(0, 10);
            firstName = listing.attributes.user.first_name;
            fullName = listing.attributes.user.first_name + " " + listing.attributes.user.last_name;
            userId = listing.attributes.user.id;
            const commodity = listing.attributes.commodity.name;
            let available;
            listing.attributes.available ? available = "✓" : available = "";
            const viewButton = parseInt(this.props.userId) === listing.attributes.user.id ? {backgroundColor:"#3a5f0b", color:"#FFF"} : null;

            return (
                <tr key={listing.id}>
                    <td><Link to={`/listings/${listing.id}`} title="View Listing" onClick={() => this.handleClick(listing.id)}>{padIds(listing.id)}</Link></td>
                    <td>{listDate}</td>
                    <td>{commodity}</td>
                    { this.props.match.path === "/listings" || this.props.match.path === "/listings/other-farmers" ?
                        <td><Link to={`/farmers/${userId}/listings`} title={`${firstName}'s Listings`}>{fullName}</Link></td> :
                        null
                    }
                    <td id="td_available">{available}</td>
                    <td>{listing.attributes.interests.length > 0 ? listing.attributes.interests.length : null}</td>
                    <td><button onClick={() => {this.handleClick(listing.id); this.props.history.push(`/listings/${listing.id}`)}} style={viewButton}>view</button></td>
                </tr>
            )
        })

        const renderListings = () => {
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>List Date</th>
                            <th>Commodity</th>
                            { this.props.match.path === "/listings" || this.props.match.path === "/listings/other-farmers" ?
                                <th>Farmer</th> :
                                null
                            }
                            <th>Available</th>
                            <th>Interests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings}
                    </tbody>
                </table>
            )
        }

        const linkToFarmerProfile = <div id="link_div"><Link to={`/farmers/${userId}`} title={`${firstName}'s Profile`} onClick={() => this.handleFetchFarmer(userId)}>{fullName}</Link></div>

        return (
            <div className="Listings_main_div">
                { this.props.isLoadingListings ?
                    <Loader /> :
                    <>
                    { this.props.match.path !== "/users/:id/closed-listings" ?
                        this.props.listings.length > 0 ?
                            <h4>{listings.length} {listings.length > 1 ? "Open Listings" : "Open Listing" }</h4> :
                            <h4>No Open Listing</h4>
                        :
                        this.props.listings.length > 0 ?
                            <h4>{listings.length} {listings.length > 1 ? "Closed Listings" : "Closed Listing" }</h4> :
                            <h4>No Closed Listing</h4>
                    }
                    <h4 id="category">{listingsCategory}</h4>
                    { this.props.match.path.endsWith(":id/listings") || this.props.match.path.endsWith(":id/closed-listings") ?
                        linkToFarmerProfile :
                        null
                    }
                    {this.props.listings[0] && renderListings()}
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
        fetchListings: () => dispatch(fetchListings()),
        fetchCommodities: () => dispatch(fetchCommodities()),
        fetchListing: (id) => dispatch(fetchListing(id)),
        fetchFarmer: (id) => dispatch(fetchFarmer(id)),
        fetchProspects: (userId) => dispatch(fetchProspects(userId)),
        fetchListingsInterests: () => dispatch(fetchListingsInterests()),
        clearErrorMessages: () => dispatch(clearErrorMessages()),
        fetchUserClosedListings: (userId) => dispatch(fetchUserClosedListings(userId)),
        listingsRendered: () => dispatch(listingsRendered()),
        listingsUnrendered: () => dispatch(listingsUnrendered())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);