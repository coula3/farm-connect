import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AppFooter.css';

const AppFooter = (props) => (
    <div className="AppFooter_main_div">
        <span><Link to="/terms-of-service">Terms of Service</Link></span>
        <br />
        <small>&copy; {new Date().getUTCFullYear()} <span id="app_name_span"><strong>farmConnect</strong></span></small>
    </div>
)

export default withRouter(AppFooter);