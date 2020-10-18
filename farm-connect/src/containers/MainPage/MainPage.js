import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
    render (){
        return (
            <div>
                <h3>Main Page</h3>
                <div style={{width: "15%", display: "inline", float: "left"}}>
                    <Link to="/user-profile">User Profile</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        userAttributes: state.userAttributes
    }
}

export default connect(mapStateToProps)(MainPage);