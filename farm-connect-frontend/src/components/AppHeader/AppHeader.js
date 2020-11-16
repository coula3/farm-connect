import React from 'react';
import logoSrc from '../../assets/farmConnectLogo.png'
import './AppHeader.css';

const AppHeader = () => {
    return(
        <div className="AppHeader_main_div">
            <img id="logo_img" alt="Farm Connect Logo" src={logoSrc} />
            <div id="name_div">farmConnect</div>
            <span>changing lives through connects</span>
        </div>
    )
}

export default AppHeader;