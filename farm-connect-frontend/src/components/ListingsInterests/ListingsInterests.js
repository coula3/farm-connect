import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { padIds } from '../../utils/miscellaneousUtils';
import balloons from '../../assets/balloons.png';
import './ListingsInterests.css';

const ListingsInterests = (props) => {
    const pathArray = props.location.pathname.split("/");
    const listingPathId = pathArray[pathArray.length - 1];

    const handleClick = (listingId) => {
        if(listingId !== parseInt(listingPathId)){
            props.fetchListing(listingId);
        }
    }

    const listStyles = (listing) => {
        return listing[3] === parseInt(props.userId) ? "user_li" : null;
    }

    const renderBalloons = (listing) => {
        return listing[3] === parseInt(props.userId) ? <img id="balloon_img" src={balloons} alt="celebratory balloons" /> : null;
    }

    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul id="ul_interests" key={idx}>
                <li id={listStyles(listing)}><Link to={`/listings/${listing[0]}`} onClick={() => handleClick(listing[0])}>{padIds(listing[0])}</Link> - {listing[2]} ({listing[1]}) {renderBalloons(listing)}</li>
            </ul>
        );
    });

    return (
        <div className="ListingsInterests_main_div">
            { props.isLoadingInterests ?
                <Loader /> :
                <>
                    <h5 id="hil_h5">High Interest Listings</h5>
                    {listingsInterests}
                </>
            }
            <br />
        </div>
    )
}

export default ListingsInterests;