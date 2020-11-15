import React from 'react';
import loaderSrc from '../../assets/loader.gif'
import './Loader.css';

const Loader = () => (
    <div className="Loader_main_div">
        <img alt="loader" src={loaderSrc} id="img_width" />
    </div>
)

export default Loader;