import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './components/AppHeader/AppHeader';
import HeadNavBar from './components/HeaderNavBar/HeaderNavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import Routes from './components/Routes/Routes';
import { signOutUser, connectUsers, unConnectUsers } from './actions/userActions';
import { removeUserListingInterest, addUserListingInterest, fetchListing, fetchUserClosedListings, listingsRendered, listingsUnrendered, fetchListings } from './actions/listingsActions';
import { fetchProspect } from './actions/prospectsActions';
import { fetchFarmer } from './actions/farmersActions';
import ResourcesBoard from './components/ResourcesBoard/ResourcesBoard';
import AppFooter from './components/AppFooter/AppFooter';

class App extends Component {
  handleUserSignOut = () => {
    this.props.signOutUser();
  }

  handleRemoveUserListingInterest = (listingId, interestId) => {
    const payload = {listing: {interestId: interestId}};
    this.props.removeUserListingInterest(listingId, payload);
  }

  handleAddUserListingInterest = (currentUserId, listingId) => {
    this.props.addUserListingInterest(currentUserId, listingId);
  }

  fetchProspect = (id) => {
    this.props.fetchProspect(id);
  }

  handleConnectUsers = (currentUserId, connectId) => {
    this.props.connectUsers(currentUserId, connectId);
  }

  handleUnconnectUsers = (currentUserId, connectId) => {
    this.props.unConnectUsers(currentUserId, connectId)
  }

  render(){
    return (
      <div className="App">
        <Router>
          <AppHeader />
          { this.props.isAuthenticated ?
            <HeadNavBar userId={this.props.userId} userAttributes={this.props.userAttributes} userSignOut={this.handleUserSignOut} userPhoto={this.props.userPhoto} /> :
            null
          }
          <div style={{clear:"both", margin:"auto", width:"90%"}}>
            { this.props.isAuthenticated ?
              <SideNavBar
                userSignOut={this.handleUserSignOut}
                userId={this.props.userId}
                userAttributes={this.props.userAttributes}
                areOpenListingsRendered={this.props.areOpenListingsRendered}
                fetchUserClosedListings={(userId) => this.props.fetchUserClosedListings(userId)}
                listingsRendered={() => this.props.listingsRendered()}
                listingsUnrendered={() => this.props.listingsUnrendered()}
                fetchListings={() => this.props.fetchListings()}
              /> :
              null
            }
            <Routes
              isAuthenticated={this.props.isAuthenticated}
              userId={this.props.userId}
              userAttributes={this.props.userAttributes}
              commodities={this.props.commodities}
              isLoading={this.props.isLoading}
              listing={this.props.listing}
              isLoadingFarmer={this.props.isLoadingFarmer}
              farmer={this.props.farmer}
              isLoadingProspect={this.props.isLoadingProspect}
              prospect={this.props.prospect}
              farmerPhoto={this.props.farmerPhoto}
              userPhoto={this.props.userPhoto}
              removeUserListingInterest={(listingId, interestId) => this.handleRemoveUserListingInterest(listingId, interestId)}
              addUserListingInterest={(currentUserId, listingId) => this.handleAddUserListingInterest(currentUserId, listingId)}
              connectUsers={(currentUserId, farmerId) => this.handleConnectUsers(currentUserId, farmerId)}
              unConnectUsers={(currentUserId, farmerId) => this.handleUnconnectUsers(currentUserId, farmerId)}
              fetchFarmer={(farmerId) => this.props.fetchFarmer(farmerId)}
            />
            { this.props.isAuthenticated ?
              <ResourcesBoard
                isLoadingProspects={this.props.isLoadingProspects}
                prospects={this.props.prospects}
                fetchProspect={(id) => this.fetchProspect(id)}
                listingsInterests={this.props.listingsInterests}
                fetchListing={(id) => this.props.fetchListing(id)}
                isLoadingInterests={this.props.isLoadingInterests}
              /> :
              null
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
    areOpenListingsRendered: state.listings.areOpenListingsRendered
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    removeUserListingInterest: (listingId, payload) => dispatch(removeUserListingInterest(listingId, payload)),
    addUserListingInterest: (currentUserId, listingId) => dispatch(addUserListingInterest(currentUserId, listingId)),
    fetchProspect: (id) => dispatch(fetchProspect(id)),
    connectUsers: (currentUserId, connectId) => dispatch(connectUsers(currentUserId, connectId)),
    unConnectUsers: (currentUserId, connectId) => dispatch(unConnectUsers(currentUserId, connectId)),
    fetchListing: (id) => dispatch(fetchListing(id)),
    fetchUserClosedListings: (props) => dispatch(fetchUserClosedListings(props)),
    listingsRendered: () => dispatch(listingsRendered()),
    listingsUnrendered: () => dispatch(listingsUnrendered()),
    fetchListings: () => dispatch(fetchListings()),
    fetchFarmer: (farmerId) => dispatch(fetchFarmer(farmerId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);