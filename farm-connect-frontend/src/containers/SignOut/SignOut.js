import React from 'react';
import {Link} from 'react-router-dom';

class SignOut extends React.Component {
    render(){
        return (
            <div>
                You have successfully signed out!
                <br />
                <br />
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default SignOut;