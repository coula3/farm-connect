import React from 'react';
import { Link } from 'react-router-dom';

const SignOut = () => {
    return (
        <div style={{marginTop:"45px"}}>
            You've been signed out!
            <div style={{marginTop:"30px"}}>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default SignOut;