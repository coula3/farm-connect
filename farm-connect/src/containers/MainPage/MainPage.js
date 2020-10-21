import React from 'react';
import { connect } from 'react-redux';
import { fetchListings } from '../../actions/listingsActions';
import Listings from '../../components/Listings/Listings';
import { fetchCommodities } from '../../actions/commoditiesActions';

class MainPage extends React.Component {
    componentDidMount(){
       this.props.fetchListings();
       this.props.fetchCommodities();
    }

    render (){
        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <Listings listings={this.props.listings}/>
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
        fetchCommodities: () => dispatch(fetchCommodities())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);