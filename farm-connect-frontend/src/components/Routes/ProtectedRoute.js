import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { requestConnect, acceptConnect, unConnectUsers } from '../../actions/connectionsActions';
import * as listingsActions from '../../actions/listingsActions';
import { fetchProspect } from '../../actions/prospectsActions';
import { fetchFarmer } from '../../actions/farmersActions';

const ProtectedRoute = ({
        isAuthenticated,
        component: Component,
        ...rest
    }) => {

    return (
        <Route {...rest} render={(routerProps) => {
            return isAuthenticated
                ?   <Component {...routerProps} isAuthenticated={isAuthenticated} {...rest} />
                :   <Redirect to="/" />
        }} />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        userPhoto: state.currentUser.photo,
        userConnects: state.connects.userConnects,
        commodities: state.commodities.commodities,
        listing: state.listings.listing,
        isLoading: state.listings.isLoading,
        isLoadingFarmer: state.farmers.isLoadingFarmer,
        farmer: state.farmers.farmer,
        errorMessages: state.errorMessages.errorMessages,
        farmerPhoto: state.farmers.photo,
        isLoadingProspect: state.prospects.isLoadingProspect,
        prospect: state.prospects.prospect,
        hasListingChanged: state.listings.hasListingChanged,
        openListingsRendered: state.listings.openListingsRendered
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFarmer: (farmerId) => dispatch(fetchFarmer(farmerId)),
        fetchProspect: (prospectId) => dispatch(fetchProspect(prospectId)),
        fetchListing: (id) => dispatch(listingsActions.fetchListing(id)),
        fetchListings: (farmer, routerProps) => dispatch(listingsActions.fetchListings(farmer, routerProps)),
        removeUserListingInterest: (listingId, interestId, currentUserId) => dispatch(listingsActions.removeUserListingInterest(listingId, interestId, currentUserId)),
        addUserListingInterest: (currentUserId, listingId) => dispatch(listingsActions.addUserListingInterest(currentUserId, listingId)),
        requestConnect: (currentUserId, connectId) => dispatch(requestConnect(currentUserId, connectId)),
        acceptConnect: (currentUserId, connectId) => dispatch(acceptConnect(currentUserId, connectId)),
        unConnectUsers: (currentUserId, connectId) => dispatch(unConnectUsers(currentUserId, connectId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);