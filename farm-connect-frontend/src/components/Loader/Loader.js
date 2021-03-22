import React from "react";

import loaderSrc from "../../assets/loader.gif";
import "./Loader.css";

const Loader = () => (
  <div className="Loader-main-div">
    <img alt="loader" src={loaderSrc} id="loader-img" />
  </div>
);

export default Loader;
