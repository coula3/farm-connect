import React from 'react';
import logoSrc from '../../assets/farmConnectLogo.png'

const AppHeader = () => {
    return(
        <div style={{margin: "15px 0px 40px 0px"}}>
            <img alt="Farm Connect Logo" src={logoSrc} style={{height: "5%", width: "5%"}}/>
            <div style={{color: "#3a5f0b", fontSize: 50, fontFamily: 'Piedra'}}>farmConnect</div>
            <p>changing lives through connects</p>
        </div>
    )
}

export default AppHeader;