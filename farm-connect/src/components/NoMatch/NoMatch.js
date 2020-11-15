import React from 'react';
import { withRouter } from 'react-router-dom';
import sadEmoji from '../../assets/sadEmoji.png';
import './NoMatch.css';

const NoMatch = (props) => {
    let divStyle;
    props.isAuthenticated ? divStyle = "NoMatch_auth_main_div" : divStyle = "NoMatch_no_auth_main_div";

    return (
        <div className={divStyle}>
            <h4>
                404 - Pathname <span id="span_color">"{props.location.pathname}"</span> not found
            </h4>
            <img src={sadEmoji} alt="sad face" id="emoji_img"></img>
        </div>
    )
}

export default withRouter(NoMatch);