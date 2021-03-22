import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { paths } from "../../utils/miscellaneousUtils";

import "./SideNavBar.css";

import { showMobileResourcesBoard } from "../../actions/miscellaneousActions";

const SideNavBar = (props) => {
  const totalConnects = !props.userConnects
    ? 0
    : props.userConnects.filter((connect) => connect[0].status === "accepted")
        .length;
  const totalConnectRequests = !props.userConnects
    ? 0
    : props.userConnects.filter(
        (connect) =>
          connect[0].status === "pending" &&
          connect[0].user_id !== parseInt(props.userId)
      ).length;
  const totalInterests = props.countUserInterestsListings;

  const handleFetchListings = () => {
    if (!props.openListingsRendered || props.hasListingChanged) {
      props.fetchListings();
      props.fetchListingsInterests();
      props.listingsRendered();
    }
  };

  const handleFetchClosedUserListings = () => {
    if (props.openListingsRendered || props.myInterestsRendered) {
      props.fetchUserClosedListings(props.userId);
      props.fetchListingsInterests();
      props.listingsUnrendered();
    }
  };

  const handleFetchUserInterestsListings = (userId) => {
    if (!props.myInterestsRendered || props.hasListingChanged) {
      props.fetchUserInterestsListings(userId);
    }
  };

  const handleSearchOptionClick = () => {
    const noUserSearchResultHeader = document.getElementById(
      "no-user-search-result"
    );

    if (noUserSearchResultHeader) {
      noUserSearchResultHeader.remove();
    }
    props.clearSearchResults();
  };

  const renderCreateListing = () => {
    if (props.userAttributes.type === "Farmer") {
      return (
        <p>
          <Link to={paths().NEW_LISTING_PATH}>Create Listing</Link>
        </p>
      );
    }
  };

  const renderFarmerUserLinks = () => {
    if (props.userAttributes.type === "Farmer") {
      return (
        <div id="farmers-view-padding" className="listings-panel">
          <p id="other-farmers-p">
            <Link
              to={paths().OTHER_FARMERS_LISTINGS_PATH}
              onClick={handleFetchListings}
            >
              Other Farmers
            </Link>
          </p>

          <h4 id="my-listings-span">
            <strong>My Listings</strong>
          </h4>

          <p>
            <Link
              to={`/users/${props.userId}/listings`}
              onClick={handleFetchListings}
            >
              Open
            </Link>
          </p>

          <p>
            <Link
              to={`/users/${props.userId}/closed-listings`}
              onClick={handleFetchClosedUserListings}
            >
              Closed
            </Link>
          </p>
        </div>
      );
    }
  };

  const renderMyConnectsLink = () => {
    if (totalConnects === 0) {
      return (
        <p className="my-connects-tags">
          My Connects
          <span id="my-connect-space-span"></span>
          <span className="my-connects-span">{totalConnects}</span>
        </p>
      );
    } else {
      return (
        <p>
          <Link to="/my-connects" className="my-connects-tags">
            My Connects
          </Link>
          <span className="my-connects-span">{totalConnects}</span>
        </p>
      );
    }
  };

  return (
    <div>
      <div className="SideNavBar-main-div">
        <br />
        <p>
          <Link to={`/users/${props.userId}`}>Profile</Link>
        </p>

        <div id="create-listings-listings-padding" className="listings-panel">
          {renderCreateListing()}

          <p id="listings-link-p">
            <Link to={paths().LISTINGS_PATH} onClick={handleFetchListings}>
              Listings
            </Link>
          </p>
        </div>

        {renderFarmerUserLinks()}

        <br />
        {renderMyConnectsLink()}
        {totalConnectRequests ? (
          <p>
            <Link to="/connect-requests" className="requests-interests-links">
              Connect Requests
            </Link>
            <span className="requests-interests-spans">
              {totalConnectRequests}
            </span>
          </p>
        ) : null}
        <p>
          <Link
            to="/listings/my-interests"
            className="requests-interests-links"
            onClick={() => handleFetchUserInterestsListings(props.userId)}
          >
            My Interests
          </Link>
          <span className="requests-interests-spans">{totalInterests}</span>
        </p>

        <p id="discover-more" onClick={() => props.showMobileResourcesBoard()}>
          Discover More
        </p>

        <h4 id="search-h4">Search</h4>

        <p id="search-links-p">
          <Link to="/users/search-farmers" onClick={handleSearchOptionClick}>
            Farmers
          </Link>{" "}
          |{" "}
          <Link to="/users/search-prospects" onClick={handleSearchOptionClick}>
            Prospects
          </Link>
        </p>

        <Link
          id="bottom-signout-link"
          to={paths().SIGNOUT_PATH}
          onClick={props.userSignOut}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showMobileResourcesBoard: () => dispatch(showMobileResourcesBoard()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SideNavBar));
