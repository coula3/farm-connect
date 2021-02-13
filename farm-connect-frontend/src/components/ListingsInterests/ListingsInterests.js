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
        return listing[3] === parseInt(props.userId) ? "user-li" : null;
    }

    const renderBalloons = (listing) => {
        return listing[3] === parseInt(props.userId) ? <img id="balloon-img" src={balloons} alt="celebratory balloons" /> : null;
    }

    const listHighlight = (listing) => {
        return listing[0] === parseInt(listingPathId) && pathArray[1] === "listings" && listing[3] !== parseInt(props.userId) ? "list-highlight-styles" : null;
    }

    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul id="ul-interests" key={idx}>
                 <li id={listStyles(listing)}><span id={listHighlight(listing)}><Link to={`/listings/${listing[0]}`} onClick={() => handleClick(listing[0])}>{padIds(listing[0])}</Link> - {listing[2]} ({listing[1]}) {renderBalloons(listing)}</span></li>
            </ul>
        );
    });

    return (
        <div className="ListingsInterests-main-div">
            { props.isLoadingInterests
                ?   <div id="loader-div"><Loader /></div>
                :   <>
                        <h4>High Interest Listings</h4>
                        {listingsInterests}
                    </>
            }
            <br />
        </div>
    )
}

export default ListingsInterests;