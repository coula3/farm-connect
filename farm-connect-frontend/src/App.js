import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppHeader from './components/AppHeader/AppHeader';
import HeaderNavBar from './containers/HeaderNavBar/HeaderNavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import Routes from './components/Routes/Routes';
import ResourcesBoard from './components/ResourcesBoard/ResourcesBoard';
import AppFooter from './components/AppFooter/AppFooter';
import ListingsInterests from './components/ListingsInterests/ListingsInterests';
import SuggestedProspects from './components/SuggestedProspects/SuggestedProspects';

import * as listingsActions from './actions/listingsActions';
import { fetchProspect } from './actions/prospectsActions';
import { fetchListingsInterests } from './actions/interestsActions';
import { signOutUser } from './actions/userActions';

import './App.css';

class App extends Component {
  handleUserSignOut = () => {
    this.props.signOutUser();
  }

  fetchProspect = (id) => {
    this.props.fetchProspect(id);
  }

  componentDidMount(){
    if (JSON.parse(localStorage.getItem("bottom"))){
      document.getElementById("arrow-down-scroll-span").style.display = "none";
      document.getElementById("arrow-up-scroll-span").style.display = "inline";
      document.getElementById("arrow-up-scroll-span").innerHTML = "⇪";
    }
  }

  handleArrowDownScroll = (e) => {
    window.scrollBy(0, 100);

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      document.getElementById("arrow-down-scroll-span").style.display = "none";
      document.getElementById("arrow-up-scroll-span").style.display = "inline";
      document.getElementById("arrow-up-scroll-span").innerHTML = "⇪";
      localStorage.setItem("bottom", true)
    }
  }

  handleArrowUpScroll = (e) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    window.addEventListener("scroll", function(){
      if(window.scrollY === 0){
        document.getElementById("arrow-down-scroll-span").style.display = "inline";
        document.getElementById("arrow-up-scroll-span").style.display = "none";
        document.getElementById("arrow-down-scroll-span").innerHTML = "⇩";
        localStorage.setItem("bottom", false)
      }
    });
  }

  render(){
    return (
      <div className="App">
          <div>
            <AppHeader
              openListingsRendered={this.props.openListingsRendered}
              hasListingChanged={this.props.hasListingChanged}
              fetchListings={this.props.fetchListings}
              fetchListingsInterests={this.props.fetchListingsInterests}
              listingsRendered={this.props.listingsRendered}
            />

            { this.props.isAuthenticated
              ? <HeaderNavBar
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

              { this.props.isAuthenticated
                ? <div id="mobile-resources-board">
                    <div id="mobile-HIL-div">
                      <ListingsInterests
                        listing={this.props.listing}
                        fetchListing={this.props.fetchListing}
                        listingsInterests={this.props.listingsInterests}
                        location={this.props.location}
                        history={this.props.history}
                      />
                    </div>

                    <div id="mobile-suggested-prospects-div">
                      <SuggestedProspects
                        prospects={this.props.prospects}
                        fetchProspect={this.props.fetchProspect}
                        isLoadingProspects={this.props.isLoadingProspects}
                        location={this.props.location}
                      />
                    </div>

                    { <span id="arrow-down-scroll-span" onClick={this.handleArrowDownScroll}>⇩</span> }

                    { <span id="arrow-up-scroll-span" onClick={this.handleArrowUpScroll}>⇪</span> }
                  </div>
                : null
              }

              <div className="side-columns">
                { this.props.isAuthenticated
                  ? <ResourcesBoard
                      isLoadingProspects={this.props.isLoadingProspects}
                      userId={this.props.userId}
                      prospects={this.props.prospects}
                      listingsInterests={this.props.listingsInterests}
                      listing={this.props.listing}
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
    listing: state.listings.listing,
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
