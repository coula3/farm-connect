import React from 'react';
import './AppFooter.css';

const AppFooter = () => (
    <div className="AppFooter_main_div">
        <small>&copy; {new Date().getUTCFullYear()} <span id="app_name_span"><strong>farmConnect</strong></span></small>
    </div>
)

export default AppFooter;