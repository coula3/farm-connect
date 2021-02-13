import React from 'react';
import logoSrc from '../../assets/farmConnectLogo.png';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => {
    return(
        <div className="AppHeader-main-div">
            <Link to="/listings">
                <img id="logo-img" alt="Farm Connect Logo" src={logoSrc} />
            </Link>
            <div id="name-div">farmConnect</div>
            <span>changing lives through connects</span>
        </div>
    )
}

export default AppHeader;