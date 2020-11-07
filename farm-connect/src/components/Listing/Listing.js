import React from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { getDate} from '../../assets/Miscellaneous';

const Listing = (props) => {
    const renderEditLink = (currentUserId, listingUserId, listingId) => {
        if(parseInt(currentUserId) === listingUserId){
            return <Link to={`/listings/${listingId}/edit`}>Edit Listing</Link>
        } else {
            return null
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

    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoading ?
                <Loader /> :
                <div>
                    <p><label>List ID: </label>{props.listing.id}</p>
                    <p><label>List Date: </label>{getDate(props.listing.attributes.date)}</p>
                    <p><label>Farmer: </label>{props.listing.attributes.user.first_name} {props.listing.attributes.user.last_name}</p> 
                    <p><label>Commodity: </label>{props.listing.attributes.commodity.name}</p>
                    <p><label>Estimated Availability: </label>{props.listing.attributes.availability ? getDate(props.listing.attributes.availability) : null}</p>
                    {props.listing.attributes.available ?
                        <p><label>Available: </label>{convertTrueToYes(props.listing.attributes.available)}</p> :
                        null
                    }
                    <p><label>Quantity: </label>{props.listing.attributes.quantity} {props.listing.attributes.quantity > 1 ? props.listing.attributes.measure + "s" : props.listing.attributes.measure}</p>
                    <label>Supplementary Information</label>
                    <p>{props.listing.attributes.information}</p>
                    <br />
                    <p><label style={{marginRight: 2, fontSize: 30, color: setHeartColor(props.userId, props.listing.attributes.interests)}} onClick={() => handleUpdateUserListingInterest(props.userId, props.listing.attributes.user.id, props.listing.id, props.listing.attributes.interests)}>{selectHeartType(props.userId, props.listing.attributes.interests)}</label>{props.listing.attributes.interests.length}</p>
                    <br />

                    {renderEditLink(props.userId, props.listing.attributes.user.id, props.listing.id)}
                </div>
            }
        </div>
    )
}

export default Listing;