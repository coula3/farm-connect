import React from 'react';
import { connect } from 'react-redux';
import { fetchListings } from '../../actions/listingsActions';
import Listings from '../../components/Listings/Listings';

class MainPage extends React.Component {
    componentDidMount(){
       this.props.fetchListings();
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
        listings: state.listings.listings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchListings: () => dispatch(fetchListings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);