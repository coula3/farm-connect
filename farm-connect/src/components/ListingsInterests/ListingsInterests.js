import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { padIds } from '../../assets/miscellaneous';

const ListingsInterests = (props) => {
    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul style={{listStyle:"none", paddingLeft:"0px"}} key={idx}>
                <li><Link to={`/listings/${listing[0]}`} onClick={() => props.fetchListing(listing[0])}>{padIds(listing[0])}</Link> - {listing[2]} ({listing[1]})</li>
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