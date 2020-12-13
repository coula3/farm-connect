import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './components/AppHeader/AppHeader';
import HeadNavBar from './components/HeaderNavBar/HeaderNavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import Routes from './components/Routes/Routes';
import { signOutUser } from './actions/userActions';
import { requestConnect, acceptConnect, unConnectUsers } from './actions/connectionsActions';
import * as listingsActions from './actions/listingsActions';
import { fetchProspect } from './actions/prospectsActions';
import { fetchFarmer } from './actions/farmersActions';
import ResourcesBoard from './components/ResourcesBoard/ResourcesBoard';
import { fetchListingsInterests } from './actions/interestsActions';
import AppFooter from './components/AppFooter/AppFooter';

class App extends Component {
  handleUserSignOut = () => {
    this.props.signOutUser();
  }

  handleRemoveUserListingInterest = (listingId, interestId, currentUserId) => {
    const payload = {listing: {interestId: interestId, currentUserId: currentUserId}};
    this.props.removeUserListingInterest(listingId, payload);
  }

  handleAddUserListingInterest = (currentUserId, listingId) => {
    this.props.addUserListingInterest(currentUserId, listingId);
  }

  fetchProspect = (id) => {
    this.props.fetchProspect(id);
  }

  handleRequestConnect = (currentUserId, connectId) => {
    this.props.requestConnect(currentUserId, connectId);
  }

  handleUnconnectUsers = (currentUserId, connectId) => {
    this.props.unConnectUsers(currentUserId, connectId)
  }

  render(){
    return (
      <div className="App">
        <Router>
          <AppHeader />

          { this.props.isAuthenticated
            ? <HeadNavBar
                userId={this.props.userId}
                userAttributes={this.props.userAttributes}
                userSignOut={this.handleUserSignOut}
                userPhoto={this.props.userPhoto}
              />
            : null
          }

          <div id="authenticated_div">
            { this.props.isAuthenticated
              ? <SideNavBar
                  userSignOut={this.handleUserSignOut}
                  userId={this.props.userId}
                  userAttributes={this.props.userAttributes}
                  hasListingChanged={this.props.hasListingChanged}
                  countUserInterestsListings={this.props.countUserInterestsListings}
                  openListingsRendered={this.props.openListingsRendered}
                  myInterestsRendered={this.props.myInterestsRendered}
                  userConnects={this.props.userConnects}
                  fetchUserClosedListings={(userId) => this.props.fetchUserClosedListings(userId)}
                  listingsRendered={() => this.props.listingsRendered()}
                  listingsUnrendered={() => this.props.listingsUnrendered()}
                  fetchListings={() => this.props.fetchListings()}
                  fetchListingsInterests={() => this.props.fetchListingsInterests()}
                  fetchUserInterestsListings={(id) => this.props.fetchUserInterestsListings(id)}
                />
              : null
            }

            <Routes
              isAuthenticated={this.props.isAuthenticated}
              userId={this.props.userId}
              userAttributes={this.props.userAttributes}
              commodities={this.props.commodities}
              isLoading={this.props.isLoading}
              listing={this.props.listing}
              hasListingChanged={this.props.hasListingChanged}
              openListingsRendered={this.props.openListingsRendered}
              isLoadingFarmer={this.props.isLoadingFarmer}
              farmer={this.props.farmer}
              isLoadingProspect={this.props.isLoadingProspect}
              prospect={this.props.prospect}
              farmerPhoto={this.props.farmerPhoto}
              userPhoto={this.props.userPhoto}
              userConnects={this.props.userConnects}
              removeUserListingInterest={(listingId, interestId, currentUserId) => this.handleRemoveUserListingInterest(listingId, interestId, currentUserId)}
              addUserListingInterest={(currentUserId, listingId) => this.handleAddUserListingInterest(currentUserId, listingId)}
              requestConnect={(currentUserId, connectId) => this.handleRequestConnect(currentUserId, connectId)}
              acceptConnect={(currentUserId, connectId) => this.props.acceptConnect(currentUserId, connectId)}
              unConnectUsers={(currentUserId, farmerId) => this.handleUnconnectUsers(currentUserId, farmerId)}
              fetchFarmer={(farmerId) => this.props.fetchFarmer(farmerId)}
              fetchListings={() => this.props.fetchListings()}
            />

            { this.props.isAuthenticated
              ? <ResourcesBoard
                  isLoadingProspects={this.props.isLoadingProspects}
                  userId={this.props.userId}
                  prospects={this.props.prospects}
                  fetchProspect={(id) => this.fetchProspect(id)}
                  listingsInterests={this.props.listingsInterests}
                  fetchListing={(id) => this.props.fetchListing(id)}
                  isLoadingInterests={this.props.isLoadingInterests}
                />
              : null
            }
          </div>

          { !this.props.isAuthenticated ? <AppFooter /> : null }
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.currentUser.userId,
    userAttributes: state.currentUser.userAttributes,
    isAuthenticated: state.currentUser.isAuthenticated,
    commodities: state.commodities.commodities,
    isLoading: state.listings.isLoading,
    listing: state.listings.listing,
    countUserInterestsListings: state.listings.countUserInterestsListings,
    hasListingChanged: state.listings.hasListingChanged,
    isLoadingFarmer: state.farmers.isLoadingFarmer,
    farmer: state.farmers.farmer,
    isLoadingProspects: state.prospects.isLoadingProspects,
    prospects: state.prospects.prospects,
    isLoadingProspect: state.prospects.isLoadingProspect,
    prospect: state.prospects.prospect,
    farmerPhoto: state.farmers.photo,
    userPhoto: state.currentUser.photo,
    isLoadingUser: state.currentUser.isLoading,
    listingsInterests: state.interests.listingsInterests,
    isLoadingInterests: state.interests.isLoadingInterests,
    openListingsRendered: state.listings.openListingsRendered,
    myInterestsRendered: state.listings.myInterestsRendered,
    userConnects: state.connects.userConnects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    removeUserListingInterest: (listingId, payload) => dispatch(listingsActions.removeUserListingInterest(listingId, payload)),
    addUserListingInterest: (currentUserId, listingId) => dispatch(listingsActions.addUserListingInterest(currentUserId, listingId)),
    fetchProspect: (id) => dispatch(fetchProspect(id)),
    requestConnect: (currentUserId, connectId) => dispatch(requestConnect(currentUserId, connectId)),
    acceptConnect: (currentUserId, connectId) => dispatch(acceptConnect(currentUserId, connectId)),
    unConnectUsers: (currentUserId, connectId) => dispatch(unConnectUsers(currentUserId, connectId)),
    fetchListing: (id) => dispatch(listingsActions.fetchListing(id)),
    fetchUserClosedListings: (props) => dispatch(listingsActions.fetchUserClosedListings(props)),
    listingsRendered: () => dispatch(listingsActions.listingsRendered()),
    listingsUnrendered: () => dispatch(listingsActions.listingsUnrendered()),
    fetchListings: () => dispatch(listingsActions.fetchListings()),
    fetchFarmer: (farmerId) => dispatch(fetchFarmer(farmerId)),
    fetchListingsInterests: () => dispatch(fetchListingsInterests()),
    fetchUserInterestsListings: (id) => dispatch(listingsActions.fetchUserInterestsListings(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
