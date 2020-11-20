import React from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { getDate } from '../../utils/miscellaneousUtils';
import './Listing.css';

const Listing = (props) => {
    const renderEditButton = (currentUserId, listingUserId, listingId) => {
        if(!props.listing.attributes.closed){
            if(parseInt(currentUserId) === listingUserId){
                return (
                    <>
                        <br />
                        <button className="global_btn" onClick={() => props.history.push(`/listings/${listingId}/edit`)}>Edit</button>
                    </>
                );
            } else {
                return null
            }
        }
    }

    const handleUpdateUserListingInterest = (currentUserId, listingUserId, listingId, listingInterests) => {
        const interest = listingInterests.find(interest => interest.user_id === parseInt(currentUserId))

        if(parseInt(currentUserId) !== listingUserId){
            interest ? props.removeUserListingInterest(listingId, interest.id) : props.addUserListingInterest(currentUserId, listingId)
        } else {
            // do nothing
        }
    }

    const setHeartColor = (currentUserId, listingInterests) => {
        const matchId = listingInterests.find(interest => interest.user_id === parseInt(currentUserId))
        return matchId ? "#3a5f0b" : ""
    }

    const selectHeartType = (currentUserId, listingInterests) => {
        const matchId = listingInterests.find(interest => interest.user_id === parseInt(currentUserId))
        return matchId ? "♥" : "♡"
    }

    const convertTrueToYes = (trueFalseValue) => {
        return trueFalseValue ? "Yes" : null;
    }

    let listingPluralized;
    props.userAttributes.listings.length > 1 ? listingPluralized = "My Listings" : listingPluralized = "My Listing";

    return (
        <div className="Listing_main_div">
            { props.isLoading ?
                <Loader /> :
                <div id="listing_card">
                    <div id="listing_details">
                        { props.listing.attributes.interests.length >= 5 && !props.listing.attributes.closed ?
                            <div id="interest_div">
                                <strong>HIGH INTEREST</strong>
                            </div> :
                            null
                        }
                        <h3>Listing</h3>
                        <p><label className="color_lbl padding_lbl"><strong>Listing ID:</strong> </label>{props.listing.id}</p>
                        <p><label className="color_lbl padding_lbl"><strong>Listing Date:</strong> </label>{getDate(props.listing.attributes.date)}</p>
                        <p><label className="color_lbl padding_lbl"><strong>Farmer:</strong> </label><Link id="name_link" to={`/farmers/${props.listing.attributes.user.id}`} onClick={() => props.fetchFarmer(props.listing.attributes.user.id)}>{props.listing.attributes.user.first_name} {props.listing.attributes.user.last_name}</Link></p>
                        <p><label className="color_lbl padding_lbl"><strong>Commodity:</strong> </label>{props.listing.attributes.commodity.name}</p>
                        <p><label className="color_lbl padding_lbl"><strong>Estimated Availability:</strong> </label>{props.listing.attributes.availability ? getDate(props.listing.attributes.availability) : null}</p>
                        {props.listing.attributes.available ?
                            <p><label className="color_lbl padding_lbl"><strong>Available:</strong> </label>{convertTrueToYes(props.listing.attributes.available)}</p> :
                            null
                        }
                        { props.listing.attributes.quantity ?
                            <p><label className="color_lbl padding_lbl"><strong>Quantity:</strong> </label>{props.listing.attributes.quantity} {props.listing.attributes.quantity > 1 ? props.listing.attributes.measure + "s" : props.listing.attributes.measure}</p> :
                            null
                        }
                        { props.listing.attributes.information ?
                            <>
                                <label className="color_lbl"><strong>Supplementary Information</strong></label>
                                <p id="info_p">{props.listing.attributes.information}</p>
                            </> :
                            null
                        }
                        <br />
                        <p className="no_select"><label id="heart_lbl" className="no_select" style={{color: setHeartColor(props.userId, props.listing.attributes.interests)}} onClick={() => handleUpdateUserListingInterest(props.userId, props.listing.attributes.user.id, props.listing.id, props.listing.attributes.interests)}>{selectHeartType(props.userId, props.listing.attributes.interests)}</label>{props.listing.attributes.interests.length}</p>

                        { props.listing.attributes.closed ?
                            <h5 id="closed_listing">Closed on {getDate(props.listing.attributes.closed)}</h5> :
                            <h5 id="listing_last_edit">Last edited on {getDate(props.listing.attributes.updated_at)}</h5>
                        }

                        {renderEditButton(props.userId, props.listing.attributes.user.id, props.listing.id)}

                        <div style={{marginTop:"20px"}}>
                            { props.userAttributes.type === "Farmer" ?
                            <button className="global_btn" onClick={() => props.history.push(`/users/${props.userId}/listings`)}>{listingPluralized}</button> :
                                null
                            }
                            <button className="global_btn" onClick={() => props.history.push("/listings") }>Listings</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Listing;