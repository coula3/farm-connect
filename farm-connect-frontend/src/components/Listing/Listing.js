import React, { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { getFullName, getDate, getDateTime, padIds } from '../../utils/miscellaneousUtils';
import './Listing.css';

const Listing = (props) => {
    let toFetchListing;

    useEffect(() => {
        toFetchListing && props.fetchListing(props.match.params.id);
    });

    const renderEditButton = (currentUserId, listingUserId, listingId) => {
        if(!props.listing.attributes.closed){
            if(parseInt(currentUserId) === listingUserId){
                return (
                    <>
                        <button id="listing-edit-btn" className="global-btn" onClick={() => props.history.push(`/listings/${listingId}/edit`)}>Edit</button>
                    </>
                );
            } else {
                return null
            }
        }
    }

    const handleFetchFarmer = (e, id) => {
        e.preventDefault();
        props.fetchFarmer(id);
    }

    const handleUpdateUserListingInterest = (currentUserId, listingUserId, listingId, listingInterests) => {
        const interest = listingInterests.find(interest => interest.user_id === parseInt(currentUserId));

        if(parseInt(currentUserId) !== listingUserId){
            interest ? props.removeUserListingInterest(listingId, interest.id, currentUserId) : props.addUserListingInterest(currentUserId, listingId);
        } else {
            // do nothing
        }
    }

    const handlePushToUserListings = () => {
        props.hasListingChanged && props.openListingsRendered && props.fetchListings();
        return props.history.push(`/users/${props.userId}/listings`);
    }

    const handlePushToListings = () => {
        props.hasListingChanged && props.openListingsRendered && props.fetchListings();
        return props.history.push("/listings");
    }

    const setHeartColor = (currentUserId, listingInterests) => {
        const matchId = listingInterests.find(interest => interest.user_id === parseInt(currentUserId));
        return matchId ? "#3a5f0b" : "";
    }

    const selectHeartType = (currentUserId, listingInterests) => {
        const matchId = listingInterests.find(interest => interest.user_id === parseInt(currentUserId));
        return matchId ? "♥" : "♡";
    }

    const convertTrueToYes = (trueFalseValue) => {
        return trueFalseValue ? "Yes" : null;
    }

    let listingPluralized;
    props.userAttributes.listings.length > 1 ? listingPluralized = "My Listings" : listingPluralized = "My Listing";

    return (
        <div className="Listing-main-div">
            { props.isLoading
                ?   <Loader />
                :   <div className="listing-card">
                        {(() => toFetchListing = props.match.params.id !== props.listing.id)()}

                        <div id="listing-details">
                            { props.listing.attributes.interests.length >= 5 && !props.listing.attributes.closed
                                ?   <span id="listing-high-interest-span">
                                        <strong>HIGH INTEREST</strong>
                                    </span>
                                :   null
                            }

                            <h3>Listing</h3>

                            <p>
                                <label className="listing-label-color listing-label-padding"><strong>LID:</strong> </label>
                                <span className="listing-id-span">{padIds(props.listing.id)}</span>
                            </p>

                            <p>
                                <label className="listing-label-color listing-label-padding"><strong>Listing Date:</strong></label>
                                {getDate(props.listing.attributes.date)}
                            </p>

                            <p>
                                <label className="listing-label-color listing-label-padding"><strong>Farmer:</strong></label>
                                <Link id="listing-name-link" to={`/farmers/${props.listing.attributes.user.id}`} onClick={(e) => handleFetchFarmer(e, props.listing.attributes.user.id)}>
                                    {getFullName(props.listing.attributes.user.first_name, props.listing.attributes.user.last_name)}
                                </Link>
                            </p>

                            <p>
                                <label className="listing-label-color listing-label-padding"><strong>Commodity:</strong></label>
                                {props.listing.attributes.commodity.name}
                            </p>

                            <p>
                                <label className="listing-label-color listing-label-padding"><strong>Estimated Availability:</strong></label>
                                {props.listing.attributes.availability ? getDate(props.listing.attributes.availability) : null}
                            </p>

                            { props.listing.attributes.available
                                ?   <p>
                                        <label className="listing-label-color listing-label-padding"><strong>Available:</strong></label>
                                        {convertTrueToYes(props.listing.attributes.available)}
                                    </p>
                                :   null
                            }

                            { props.listing.attributes.quantity
                                ?   <p>
                                        <label className="listing-label-color listing-label-padding"><strong>Quantity:</strong></label>
                                        {props.listing.attributes.quantity} {props.listing.attributes.quantity > 1 ? props.listing.attributes.measure + "s" : props.listing.attributes.measure}
                                    </p>
                                :   null
                            }

                            { props.listing.attributes.information
                                ?   <>
                                        <label className="listing-label-color"><strong>Supplementary Information</strong></label>
                                        <p id="listing-info-p">{props.listing.attributes.information}</p>
                                    </>
                                :   null
                            }

                            <p className="no-select">
                                <label id="heart-lbl" style={{color: setHeartColor(props.userId, props.listing.attributes.interests)}} onClick={() => handleUpdateUserListingInterest(props.userId, props.listing.attributes.user.id, props.listing.id, props.listing.attributes.interests)}>
                                    {selectHeartType(props.userId, props.listing.attributes.interests)}
                                </label>
                                {props.listing.attributes.interests.length}
                            </p>

                            { props.listing.attributes.closed
                                ?   <h5 id="closed-listing">Closed on {getDateTime(props.listing.attributes.closed)}</h5>
                                :   parseInt(props.userId) === props.listing.attributes.user.id
                                    ?   <h5 id="listing-last-edit">Last edited on {getDateTime(props.listing.attributes.updated_at)}</h5>
                                    :   null
                            }

                            {renderEditButton(props.userId, props.listing.attributes.user.id, props.listing.id)}

                            <div id="listing-btn-div">
                                { props.userAttributes.type === "Farmer"
                                    ?   <button id="listing-mylisting-btn" className="global-btn" onClick={handlePushToUserListings}>{listingPluralized}</button>
                                    :   null
                                }
                                <button id="listing-listings-btn" className="global-btn" onClick={handlePushToListings}>Listings</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Listing;