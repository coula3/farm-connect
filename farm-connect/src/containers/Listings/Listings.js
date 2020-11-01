import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchListings, fetchListing } from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { fetchProspects } from '../../actions/prospectsActions';
import { Link } from 'react-router-dom';

class Listings extends React.Component {
    componentDidMount(){
       this.props.fetchListings();
       this.props.fetchCommodities();
       this.props.fetchProspects();
    }

    handleClick = (id) => {
        this.props.fetchListing(id)
    }

    handleFetchFarmer = (id) => {
        this.props.fetchFarmer(id);
    }

    render (){
        let baseListings;

        if(this.props.match.path.includes("users")){
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.userId))
        } else if (this.props.match.path.includes("/farmers/")) {
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id === parseInt(this.props.match.params.id))
        } else if (this.props.match.path.endsWith("/other-farmers")) {
            baseListings = this.props.listings.filter((listing) => listing.attributes.user_id !== parseInt(this.props.userId))
        } else {
            baseListings = this.props.listings
        }

        let firstName;
        let fullName;
        let userId;

        const listings = baseListings.map(listing => {
            const listDate = listing.attributes.date.slice(0, 10);
            firstName = listing.attributes.user.first_name;
            fullName = listing.attributes.user.first_name + " " + listing.attributes.user.last_name;
            userId = listing.attributes.user.id;
            const commodity = listing.attributes.commodity.name;
            let available;
            listing.attributes.available ? available = "Yes" : available = "No";
            let listingId;

            if(listing.id < 10){
                listingId = "00" + listing.id;
            } else if (listing.id > 9 && listing.id < 100){
                listingId = "0" + listing.id;
            } else {
                listingId = listing.id;
            }

            return (
                <div key={listing.id}>
                    <table style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>List Date</th>
                                <th>Commodity</th>
                                { !this.props.match.path.endsWith(":id/listings") ?
                                    <th>Farmer</th> :
                                    null
                                }
                                <th>Available</th>
                                <th>Interests</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to={`/listings/${listing.id}`} title="View Listing" onClick={() => this.handleClick(listing.id)}>{listingId}</Link></td>
                                <td>{listDate}</td>
                                <td>{commodity}</td>
                                { !this.props.match.path.endsWith(":id/listings") ?
                                    <td><Link to={`/farmers/${userId}/listings`} title={`${firstName}'s Listings`}>{fullName}</Link></td> :
                                    null
                                }
                                <td>{available}</td>
                                <td>{listing.attributes.interests.length > 0 ? listing.attributes.interests.length : null}</td>
                                <td><button onClick={() => {this.handleClick(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>view</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })

        const linkToFarmerProfile = <div style={{marginBottom:20}}><Link to={`/farmers/${userId}`} title={`${firstName}'s Profile`} onClick={() => this.handleFetchFarmer(userId)}>{fullName}</Link></div>

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                { this.props.isLoadingListings ?
                    <Loader /> :
                    <>
                    { this.props.listings.length > 0 ?
                        <h4 style={{color: "#3a5f0b"}}>{listings.length} {listings.length > 1 ? "Open Listings" : "Open Listing" }</h4> :
                        <h4 style={{color: "#3a5f0b"}}>No Open Listing</h4>
                    }
                    { this.props.match.path.endsWith(":id/listings") ?
                        linkToFarmerProfile :
                        null
                    }
                    {listings}
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
        listing: state.listings.listing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchListings: () => dispatch(fetchListings()),
        fetchCommodities: () => dispatch(fetchCommodities()),
        fetchListing: (id) => dispatch(fetchListing(id)),
        fetchFarmer: (id) => dispatch(fetchFarmer(id)),
        fetchProspects: () => dispatch(fetchProspects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);