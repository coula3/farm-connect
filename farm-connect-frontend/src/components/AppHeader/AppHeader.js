import React from 'react';
import logoSrc from '../../assets/farmConnectLogo.png';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = (props) => {
    const handleFetchListings = () => {
        if(!props.openListingsRendered || props.hasListingChanged){
            props.fetchListings();
            props.fetchListingsInterests();
            props.listingsRendered();
        }
    }
    return(
        <div className="AppHeader-main-div">
            <Link to="/listings" onClick={handleFetchListings}>
                <img id="logo-img" alt="Farm Connect Logo" src={logoSrc} />
            </Link>
            <div id="name-div">farmConnect</div>
            <span>changing lives through connects</span>
        </div>
    )
}

export default AppHeader;