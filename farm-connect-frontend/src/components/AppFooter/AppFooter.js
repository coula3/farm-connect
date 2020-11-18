import React from 'react';
import { withRouter } from 'react-router-dom';
import './AppFooter.css';

const AppFooter = (props) => {
    const handleClick = () => {
        props.location.pathname !== "/terms-of-service" && props.history.push("/terms-of-service");
    }

    return (
        <div className="AppFooter_main_div">
            <p id="tos_p" onClick={handleClick}>Terms of Service</p>
            <small>&copy; {new Date().getUTCFullYear()} <span id="app_name_span"><strong>farmConnect</strong></span></small>
        </div>
    )
}

export default withRouter(AppFooter);