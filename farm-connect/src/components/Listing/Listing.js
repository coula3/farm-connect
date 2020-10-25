import React from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const Listing = (props) => {
    const renderEditLink = (currentUserId, listingUserId, listingId) => {
        if(parseInt(currentUserId) === listingUserId){
            return <Link to={`/listings/${listingId}/edit`}>Edit Listing</Link>
        } else {
            return null
        }
    }

    return (
        <div>
            { props.isLoading ?
                <Loader /> :
                <div style={{width: "60%", display: "inline", float: "left"}}>
                    <p><label>List ID: </label>{props.listing.id}</p>
                    <p><label>List Date: </label>{props.listing.attributes.list_date.slice(0, 10)}</p>
                    <p><label>Farmer: </label>{props.listing.attributes.user.first_name} {props.listing.attributes.user.last_name}</p> 
                    <p><label>Commodity: </label>{props.listing.attributes.commodity.name}</p>
                    <p><label>Estimated Availability: </label>{props.listing.attributes.est_availability.slice(0, 10)}</p>
                    <p><label>Quantity: </label>{props.listing.attributes.quantity}</p>
                    <p><label>Measure: </label>{props.listing.attributes.measure}</p>
                    <label>Supplementary Information</label>
                    <p>{props.listing.attributes.supp_info}</p>
                    <br />
                    <p><label>Interests: </label>{props.listing.attributes.interests.length}</p>
                    <br />

                    {renderEditLink(props.userId, props.listing.attributes.user.id, props.listing.id)}
                </div>
            }
        </div>
    )
}

export default Listing;