import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './components/AppHeader/AppHeader';
import HeadNavBar from './components/HeaderNavBar/HeaderNavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import Routes from './components/Routes/Routes';
import { signOutUser, connectUsers, unConnectUsers } from './actions/userActions';
import { removeUserListingInterest, addUserListingInterest } from './actions/listingsActions';
import { fetchProspect } from './actions/prospectsActions';
import ResourcesBoard from './components/ResourcesBoard/ResourcesBoard';

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

  handleConnectUsers = (currentUserId, farmerId) => {
    this.props.connectUsers(currentUserId, farmerId);
  }

  handleUnconnectUsers = (currentUserId, farmerId) => {
    this.props.unConnectUsers(currentUserId, farmerId)
  }

  render(){
    return (
      <div className="App">
        <Router>
          <AppHeader />
          { this.props.isAuthenticated ?
            <HeadNavBar userAttributes={this.props.userAttributes} userSignOut={this.handleUserSignOut} /> :
            null
          }
          { this.props.isAuthenticated ?
            <SideNavBar userSignOut={this.handleUserSignOut} userId={this.props.userId} userAttributes={this.props.userAttributes} /> :
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
            removeUserListingInterest={(listingId, interestId) => this.handleRemoveUserListingInterest(listingId, interestId)}
            addUserListingInterest={(currentUserId, listingId) => this.handleAddUserListingInterest(currentUserId, listingId)}
            connectUsers={(currentUserId, farmerId) => this.handleConnectUsers(currentUserId, farmerId)}
            unConnectUsers={(currentUserId, farmerId) => this.handleUnconnectUsers(currentUserId, farmerId)}
          />
          { this.props.isAuthenticated ?
            <ResourcesBoard isLoadingProspects={this.props.isLoadingProspects} prospects={this.props.prospects} fetchProspect={(id) => this.fetchProspect(id)}/> :
            null
          }
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
    farmerPhoto: state.farmers.photo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    removeUserListingInterest: (listingId, payload) => dispatch(removeUserListingInterest(listingId, payload)),
    addUserListingInterest: (currentUserId, listingId) => dispatch(addUserListingInterest(currentUserId, listingId)),
    fetchProspect: (id) => dispatch(fetchProspect(id)),
    connectUsers: (currentUserId, farmerId) => dispatch(connectUsers(currentUserId, farmerId)),
    unConnectUsers: (currentUserId, farmerId) => dispatch(unConnectUsers(currentUserId, farmerId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
