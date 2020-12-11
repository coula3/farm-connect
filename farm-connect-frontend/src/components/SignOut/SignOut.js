import React from 'react';
import { Link } from 'react-router-dom';

const SignOut = () => {
    return (
        <div style={{marginTop:"25px"}}>
            You have successfully signed out!
            <div style={{marginTop:"40px"}}>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default SignOut;