import React from 'react';
import { Link } from 'react-router-dom';

const SignOut = () => {
    return (
        <div style={{marginTop:"45px"}}>
            <span style={{fontFamily: "Satisfy", fontSize: "24px"}}>You've been signed out</span>
            <div style={{marginTop:"30px"}}>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default SignOut;