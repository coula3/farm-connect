import React from 'react';
import logoSrc from '../../assets/farmConnectLogo.png'
import './AppHeader.css';

const AppHeader = () => {
    return(
        <div className="AppHeader-main-div">
            <img id="logo-img" alt="Farm Connect Logo" src={logoSrc} />
            <div id="name-div">farmConnect</div>
            <span>changing lives through connects</span>
        </div>
    )
}

export default AppHeader;