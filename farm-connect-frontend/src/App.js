import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import HeadNavBar from './components/HeaderNavBar/HeaderNavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import Routes from './components/Routes/Routes';
import { signOutUser } from './actions/userActions';
import * as listingsActions from './actions/listingsActions';
import { fetchProspect } from './actions/prospectsActions';
import ResourcesBoard from './components/ResourcesBoard/ResourcesBoard';
import { fetchListingsInterests } from './actions/interestsActions';
import AppFooter from './components/AppFooter/AppFooter';

class App extends Component {
  handleUserSignOut = () => {
    this.props.signOutUser();
  }

  fetchProspect = (id) => {
    this.props.fetchProspect(id);
  }

  render(){
    return (
      <div className="App">
          <div>
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

            <div id="authenticated-div">
              <div className="side-columns">
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
              </div>

              <div id="routes-div">
                <Routes />
              </div>

              <div className="side-columns">
                { this.props.isAuthenticated
                  ? <ResourcesBoard
                      isLoadingProspects={this.props.isLoadingProspects}
                      userId={this.props.userId}
                      prospects={this.props.prospects}
                      listingsInterests={this.props.listingsInterests}
                      isLoadingInterests={this.props.isLoadingInterests}
                      fetchProspect={(id) => this.fetchProspect(id)}
                      fetchListing={(id) => this.props.fetchListing(id)}
                    />
                  : null
                }
              </div>
            </div>

            { !this.props.isAuthenticated && this.props.location.pathname !== "/signup" ? <AppFooter /> : null }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.currentUser.userId,
    userAttributes: state.currentUser.userAttributes,
    isAuthenticated: state.currentUser.isAuthenticated,
    countUserInterestsListings: state.listings.countUserInterestsListings,
    hasListingChanged: state.listings.hasListingChanged,
    isLoadingProspects: state.prospects.isLoadingProspects,
    prospects: state.prospects.prospects,
    userPhoto: state.currentUser.photo,
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
    fetchListing: (id) => dispatch(listingsActions.fetchListing(id)),
    fetchUserClosedListings: (props) => dispatch(listingsActions.fetchUserClosedListings(props)),
    listingsRendered: () => dispatch(listingsActions.listingsRendered()),
    listingsUnrendered: () => dispatch(listingsActions.listingsUnrendered()),
    fetchListings: (farmer, routerProps) => dispatch(listingsActions.fetchListings(farmer, routerProps)),
    fetchProspect: (prospectId) => dispatch(fetchProspect(prospectId)),
    fetchListingsInterests: () => dispatch(fetchListingsInterests()),
    fetchUserInterestsListings: (id) => dispatch(listingsActions.fetchUserInterestsListings(id))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
