import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const ListingsInterests = (props) => {
    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul style={{listStyle:"none", paddingLeft:"0px"}} key={idx}>
                <li><Link to={`/listings/${listing[0]}`} onClick={() => props.fetchListing(listing[0])}>{listing[0]}</Link> - {listing[2]} ({listing[1]})</li>
            </ul>
        )
    })

    return (
        <div>
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