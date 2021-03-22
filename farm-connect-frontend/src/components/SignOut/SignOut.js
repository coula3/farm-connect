import React from "react";
import { Link } from "react-router-dom";

import "./SignOut.css";

const SignOut = () => {
  return (
    <div className="Main_Signout_div">
      <span id="signout_msg">You've signed out</span>
      <div id="home_link_div">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default SignOut;
