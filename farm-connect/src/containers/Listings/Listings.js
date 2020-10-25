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
            const userId = listing.attributes.user.id
            const commodity = listing.attributes.commodity.name
            let available;
            listing.attributes.available ? available = "Yes" : available = "No";
            
            return (
                <div key={listing.id}>
                    <table style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th>List ID</th>
                                <th>List Date</th>
                                <th>Commodity</th>
                                <th>Farmer</th>
                                <th>Available</th>
                                <th>Interests</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{listing.id}</td>
                                <td><Link to={`/listings/${listing.id}`} onClick={(e) => this.handleClick(listing.id)}>{listDate}</Link></td>
                                <td>{commodity}</td>
                                <td><Link to={`/farmers/${userId}`} onClick={(id) => this.handleFetchFarmer(userId)}>{fullName}</Link></td>
                                <td>{available}</td>
                                <td>{listing.attributes.interests.length}</td>
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
                    listings
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