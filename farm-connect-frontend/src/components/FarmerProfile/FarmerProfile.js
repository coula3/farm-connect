import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import Loader from "../Loader/Loader";
import avatar from "../../assets/avatar.png";
import { getDate, getFullName } from "../../utils/miscellaneousUtils";
import "./FarmerProfile.css";

const FarmerProfile = (props) => {
  let usersConnected, pendingAcceptance, toFetchFarmer;

  const { fetchFarmer, match } = props;

  useEffect(() => {
    toFetchFarmer && fetchFarmer(match.params.id);
  }, [toFetchFarmer, fetchFarmer, match]);

  const isCurrentUser = (farmerId) => {
    return props.userId === farmerId;
  };

  if (!props.userConnects) {
    usersConnected = false;
  } else {
    props.userConnects.find((connect) => {
      return (usersConnected =
        (connect[0].connect_id === parseInt(props.farmer.id) ||
          connect[0].user_id === parseInt(props.farmer.id)) &&
        connect[0].status);
    });
  }

  if (props.userConnects) {
    props.userConnects.find((connect) => {
      return (pendingAcceptance =
        (connect[0].connect_id === parseInt(props.farmer.id) ||
          connect[0].user_id === parseInt(props.farmer.id)) &&
        connect[0].status === "pending");
    });
  }

  const connectionByUser = !props.userConnects
    ? false
    : props.userConnects.find((connect) => {
        return (
          connect[0].user_id === parseInt(props.userId) &&
          connect[0].connect_id === parseInt(props.farmer.id)
        );
      });

  const getFarmerPhoto = (farmerPhoto) => {
    return `http://localhost:3000/${farmerPhoto}`;
  };

  const displayMyOrFarmer = (farmerId) => {
    let listingPluralized;
    props.farmer.attributes.listings.length > 1
      ? (listingPluralized = "Listings")
      : (listingPluralized = "Listing");
    return isCurrentUser(farmerId)
      ? `My ${listingPluralized}`
      : `Farmer's ${listingPluralized}`;
  };

  const connectUnconnectUsers = (e, userId, farmerId) => {
    if (e.target.innerText === "Request Connect") {
      props.requestConnect(userId, farmerId);
    } else if (e.target.innerText === "Accept") {
      props.acceptConnect(userId, farmerId);
    } else {
      props.unConnectUsers(userId, farmerId);
    }
  };

  const handleViewListings = () => {
    props.fetchListings(props.farmer.id);
  };

  return (
    <div className="FarmerProfile-main-div">
      {props.isLoadingFarmer ? (
        <Loader />
      ) : (
        <div className="farmer-profile-card">
          {(() =>
            (toFetchFarmer = props.match.params.id !== props.farmer.id))()}

          {props.farmer.id && (
            <>
              <button
                id="x-close-btn"
                onClick={() => props.history.push("/listings")}
              >
                X
              </button>

              <h3>Farmer Profile</h3>

              <div className="img-div">
                {props.farmerPhoto ? (
                  <img
                    src={getFarmerPhoto(props.farmerPhoto)}
                    alt="user avatar"
                    className="farmer-img"
                  />
                ) : (
                  <img
                    src={avatar}
                    alt="anonymous avatar"
                    className="farmer-img"
                  />
                )}
              </div>

              <p id="id-p">
                <label>
                  <strong>UID:</strong>{" "}
                </label>
                {props.farmer.id}
              </p>
              <p>
                <label>
                  <strong>Name:</strong>{" "}
                </label>
                {getFullName(
                  props.farmer.attributes.first_name,
                  props.farmer.attributes.last_name
                )}
              </p>
              <p>
                <label>
                  <strong>Email:</strong>{" "}
                </label>
                {props.farmer.attributes.email.toLowerCase()}
              </p>
              <p className="join-date-p">
                <label>
                  <strong>Joined:</strong>{" "}
                </label>
                {getDate(props.farmer.attributes.created_at)}
              </p>

              {!isCurrentUser(props.farmer.id) ? (
                !usersConnected ? (
                  <button
                    id="farmer-request-btn"
                    className="global-btn"
                    onClick={(e) =>
                      connectUnconnectUsers(e, props.userId, props.farmer.id)
                    }
                  >
                    Request Connect
                  </button>
                ) : pendingAcceptance && !connectionByUser ? (
                  <>
                    <button
                      id="farmer-accept-btn"
                      className="global-btn"
                      onClick={(e) =>
                        connectUnconnectUsers(e, props.userId, props.farmer.id)
                      }
                    >
                      Accept
                    </button>
                    <button
                      id="farmer-decline-btn"
                      className="global-btn"
                      onClick={(e) =>
                        connectUnconnectUsers(e, props.userId, props.farmer.id)
                      }
                    >
                      Decline
                    </button>
                  </>
                ) : pendingAcceptance && connectionByUser ? (
                  <button
                    id="farmer-cancel-request-btn"
                    className="global-btn"
                    onClick={(e) =>
                      connectUnconnectUsers(e, props.userId, props.farmer.id)
                    }
                  >
                    Cancel Request
                  </button>
                ) : (
                  <div className="connect-btn-div">
                    <button
                      id="farmer-unconnect-btn"
                      onClick={(e) =>
                        connectUnconnectUsers(e, props.userId, props.farmer.id)
                      }
                    >
                      Unconnect
                    </button>
                  </div>
                )
              ) : null}
              <div id="farmer-profile-listing-btn-div">
                <button
                  id="listings-btn"
                  className="global-btn"
                  onClick={handleViewListings}
                >
                  {displayMyOrFarmer(props.farmer.id)}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(FarmerProfile);
