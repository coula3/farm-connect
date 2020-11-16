import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { padIds } from '../../utils/miscellaneousUtils';
import './ListingsInterests.css';

const ListingsInterests = (props) => {
    const handleClick = (listingId) => {
        const pathArray = props.location.pathname.split("/");
        const pathListingId = pathArray[pathArray.length - 1];

        if(listingId !== parseInt(pathListingId)){
            props.fetchListing(listingId);
        }
    }

    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul id="ul_interests" key={idx}>
                <li><Link to={`/listings/${listing[0]}`} onClick={() => handleClick(listing[0])}>{padIds(listing[0])}</Link> - {listing[2]} ({listing[1]})</li>
            </ul>
        )
    })

    return (
        <div className="ListingsInterests_main_div">
            { props.isLoadingInterests ?
                <Loader /> :
                <>
                    <h5>High Interest Listings</h5>
                    {listingsInterests}
                </>
            }
            <br />
        </div>
    )
}

export default ListingsInterests;