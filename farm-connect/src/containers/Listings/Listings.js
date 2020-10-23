import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchListings } from '../../actions/listingsActions';
import { fetchCommodities } from '../../actions/commoditiesActions';
import { Link } from 'react-router-dom';

class Listings extends React.Component {
    componentDidMount(){
       this.props.fetchListings();
       this.props.fetchCommodities();
    }

    render (){
        const listings = this.props.listings.map(listing => {
            const listDate = listing.attributes.list_date.slice(0, 10);
            const fullName = listing.attributes.user.first_name + " " + listing.attributes.user.last_name;
            const availabilityDate = listing.attributes.est_availability.slice(0, 10);
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
                                <th>Est Availability</th>
                                <th>Farmer</th>
                                <th>Available</th>
                                <th>Interests</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{listing.id}</td>
                                <td><Link to={`/listings/${listing.id}`}>{listDate}</Link></td>
                                <td>{commodity}</td>
                                <td>{availabilityDate}</td>
                                <td>{fullName}</td>
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
                { this.props.isLoading ?
                    <Loader /> :
                    listings
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.listings.isLoading,
        listings: state.listings.listings,
        commodities: state.commodities.commodities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchListings: () => dispatch(fetchListings()),
        fetchCommodities: (id) => dispatch(fetchCommodities(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);