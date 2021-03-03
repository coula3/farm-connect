import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import sadEmoji from '../../assets/sadEmoji.png';
import './NoMatch.css';

const NoMatch = (props) => {
    let divStyle;
    props.isAuthenticated ? divStyle = "NoMatch-auth-main-div" : divStyle = "NoMatch-no-auth-main-div";

    useEffect(() => {
        document.getElementById("mobile-resources-board").style.cssText += "display: none;";
        return () => document.getElementById("mobile-resources-board").style.removeProperty('display');
    }, [])

    return (
        <div className={divStyle}>
            <h1 id="h1-404">404</h1>
            <h4>
                The page <span id="span-color">"{props.location.pathname}"</span> isn't available
            </h4>
            <img src={sadEmoji} alt="sad face" id="emoji-img"></img>
        </div>
    )
}

export default withRouter(NoMatch);