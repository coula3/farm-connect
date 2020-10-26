import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchListings, fetchListing } from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { fetchFarmer } from '../../actions/farmersActions';
import { Link } from 'react-router-dom';

class Listings extends React.Component {
    componentDidMount(){
       this.props.fetchListings();
       this.props.fetchCommodities();
    }

    handleClick = (id) => {
        this.props.fetchListing(id)
    }

    handleFetchFarmer = (id) => {
        this.props.fetchFarmer(id);
    }

    render (){
        const listings = this.props.listings.map(listing => {
            const listDate = listing.attributes.list_date.slice(0, 10);
            const fullName = listing.attributes.user.first_name + " " + listing.attributes.user.last_name;
            const userId = listing.attributes.user.id;
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
                                <th>Farmer</th>
                                <th>Available</th>
                                <th>Interests</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to={`/listings/${listing.id}`} title="View Listing" onClick={() => this.handleClick(listing.id)}>{listingId}</Link></td>
                                <td>{listDate}</td>
                                <td>{commodity}</td>
                                <td><Link to={`/farmers/${userId}`} onClick={() => this.handleFetchFarmer(userId)}>{fullName}</Link></td>
                                <td>{available}</td>
                                <td>{listing.attributes.interests.length > 0 ? listing.attributes.interests.length : null}</td>
                                <td><button onClick={() => {this.handleClick(listing.id); this.props.history.push(`/listings/${listing.id}`)}}>view</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })

        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                { this.props.isLoadingListings ?
                    <Loader /> :
                    <>
                    { this.props.listings.length > 0 ?
                        <h4 style={{color: "#3a5f0b"}}>{this.props.listings.length} {this.props.listings.length > 1 ? "Open Listings" : "Open Listing" }</h4> :
                        <h4 style={{color: "#3a5f0b"}}>No Open Listing</h4>
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
        fetchFarmer: (id) => dispatch(fetchFarmer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);