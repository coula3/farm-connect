import React from 'react';
import { connect } from 'react-redux';
import SideNavBar from '../../components/SideNavBar/SideNavBar';
import UserProfile from '../../components/UserProfile/UserProfile';

class MainPage extends React.Component {
    render (){
        return (
            <div>
                <h3>Main Page</h3>
                <SideNavBar />
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