import React from 'react';
import Loader from '../Loader/Loader';
import { padIds, scrollToTopOfPage } from '../../utils/miscellaneousUtils';
import balloons from '../../assets/balloons.png';
import './ListingsInterests.css';

const ListingsInterests = (props) => {
    const pathArray = props.location.pathname.split("/");

    const handleClick = (listingId) => {
        if(listingId !== parseInt(props.listing.id)){
            props.fetchListing(listingId);
        }

        scrollToTopOfPage();

        props.history.push(`/listings/${listingId}`);
    }

    const listStyles = (listing) => {
        return listing[3] === parseInt(props.userId) ? "user-HIL" : null;
    }

    const renderBalloons = (listing) => {
        return listing[3] === parseInt(props.userId) ? <img id="balloon-img" src={balloons} alt="celebratory balloons" /> : null;
    }

    const isListingPath = pathArray.includes("listings") && pathArray.length === 3 && !isNaN(parseInt(pathArray[2]));

    const listHighlight = (listing) => {
        return isListingPath && listing[0] === parseInt(props.listing.id) && pathArray[1] === "listings" && listing[3] !== parseInt(props.userId) ? "list-highlight-styles" : null;
    }

    const renderListingsInterests = props.listingsInterests.map((listing) => {
        return (
            <ul id="ul-interests" key={listing[0]}>
                <li id={listStyles(listing)} className="HIL-li" onClick={() => handleClick(listing[0])}><span id={listHighlight(listing)}>{padIds(listing[0])} - {listing[2]} ({listing[1]}) {renderBalloons(listing)}</span></li>
            </ul>
        );
    });

    return (
        <div className="ListingsInterests-main-div">
            { props.isLoadingInterests
                ?   <div id="loader-div"><Loader /></div>
                :   <>
                        <h4>High Interest Listings</h4>
                        {renderListingsInterests}
                    </>
            }
            <br />
        </div>
    )
}

export default ListingsInterests;