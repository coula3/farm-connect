import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { padIds } from '../../utils/miscellaneousUtils';

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
            <ul style={{listStyle:"none", paddingLeft:"0px"}} key={idx}>
                <li><Link to={`/listings/${listing[0]}`} onClick={() => handleClick(listing[0])}>{padIds(listing[0])}</Link> - {listing[2]} ({listing[1]})</li>
            </ul>
        )
    })

    return (
        <div>
            { props.isLoadingInterests ?
                <Loader /> :
                <>
                    <h5 style={{color:"#3a5f0b", marginBottom:"0px"}}>High Interest Listings</h5>
                    {listingsInterests}
                </>
            }
            <br />
        </div>
    )
}

export default ListingsInterests;