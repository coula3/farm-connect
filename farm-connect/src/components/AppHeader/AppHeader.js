import React from 'react';
import logoSrc from '../../assets/farmConnectLogo.png'

const AppHeader = () => {
    return(
        <div style={{width:"90%", margin: "1% 5% 1% 5%", padding:"1% 0% 1% 0%", borderRadius:"15px", backgroundColor:"#FFF"}}>
            <img alt="Farm Connect Logo" src={logoSrc} style={{height: "5%", width: "5%"}}/>
            <div style={{color: "#3a5f0b", fontSize: 50, fontFamily: 'Piedra'}}>farmConnect</div>
            <span>changing lives through connects</span>
        </div>
    )
}

export default AppHeader;