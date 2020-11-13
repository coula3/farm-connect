import React from 'react';
import loaderSrc from '../../assets/loader.gif'

const Loader = () => (
    <div style={{width: "65%", display: "inline"}}>
        <img alt="loader" src={loaderSrc} style={{width: 75}} />
    </div>
)

export default Loader;