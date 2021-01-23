import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { requestConnect, acceptConnect, unConnectUsers } from '../../actions/connectionsActions';
import * as listingsActions from '../../actions/listingsActions';
import { fetchProspect } from '../../actions/prospectsActions';
import { fetchFarmer } from '../../actions/farmersActions';

const ProtectedRoute = ({
        isAuthenticated,
        userId,
        userAttributes,
        hasListingChanged,
        openListingsRendered,
        removeUserListingInterest,
        addUserListingInterest,
        fetchFarmer,
        fetchListing,
        fetchListings,
        commodities,
        listing,
        isLoading,
        isLoadingProspect,
        prospect,
        prospects,
        isLoadingFarmer,
        farmer,
        userConnects,
        farmerPhoto,
        userPhoto,
        fetchProspect,
        requestConnect,
        acceptConnect,
        unConnectUsers,
        component: Component,
        ...rest
    }) => {
    return (
        <Route {...rest} render={(props) => {
            return isAuthenticated
                ?   <Component {...props}
                        commodities={commodities}
                        userId={userId}
                        userAttributes={userAttributes}
                        hasListingChanged={hasListingChanged}
                        openListingsRendered={openListingsRendered}
                        fetchFarmer={fetchFarmer}
                        fetchListing={fetchListing}
                        fetchListings={fetchListings}
                        listing={listing}
                        isLoading={isLoading}
                        isLoadingProspect={isLoadingProspect}
                        prospect={prospect}
                        prospects={prospects}
                        isLoadingFarmer={isLoadingFarmer}
                        farmer={farmer}
                        userConnects={userConnects}
                        userPhoto={userPhoto}
                        farmerPhoto={farmerPhoto}
                        fetchProspect={fetchProspect}
                        requestConnect={requestConnect}
                        acceptConnect={acceptConnect}
                        unConnectUsers={unConnectUsers}
                        removeUserListingInterest={removeUserListingInterest}
                        addUserListingInterest={addUserListingInterest}
                    />
                :   <Redirect to="/" />
        }} />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        commodities: state.commodities.commodities,
        isLoading: state.listings.isLoading,
        listing: state.listings.listing,
        hasListingChanged: state.listings.hasListingChanged,
        openListingsRendered: state.listings.openListingsRendered,
        isLoadingFarmer: state.farmers.isLoadingFarmer,
        farmer: state.farmers.farmer,
        isLoadingProspects: state.prospects.isLoadingProspects,
        prospect: state.prospects.prospect,
        prospects: state.prospects.prospects,
        farmerPhoto: state.farmers.photo,
        userPhoto: state.currentUser.photo,
        userConnects: state.connects.userConnects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUserListingInterest: (listingId, payload) => dispatch(listingsActions.removeUserListingInterest(listingId, payload)),
        addUserListingInterest: (currentUserId, listingId) => dispatch(listingsActions.addUserListingInterest(currentUserId, listingId)),
        requestConnect: (currentUserId, connectId) => dispatch(requestConnect(currentUserId, connectId)),
        acceptConnect: (currentUserId, connectId) => dispatch(acceptConnect(currentUserId, connectId)),
        unConnectUsers: (currentUserId, connectId) => dispatch(unConnectUsers(currentUserId, connectId)),
        fetchFarmer: (farmerId) => dispatch(fetchFarmer(farmerId)),
        fetchProspect: (prospectId) => dispatch(fetchProspect(prospectId)),
        fetchListing: (id) => dispatch(listingsActions.fetchListing(id)),
        fetchListings: (farmer, routerProps) => dispatch(listingsActions.fetchListings(farmer, routerProps)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);