import React from 'react';
import logoSrc from '../../assets/farm-connect-logo.png'

const AppHeader = () => {
    return(
        <div style={{marginTop: 15}}>
            <img alt="Farm Connect Logo" src={logoSrc} style={{height: "5%", width: "5%"}}/>
            <h1>Farm Connect</h1>
        </div>
    )
}

export default AppHeader;