import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions/userActions';

class SignOut extends React.Component {
    componentDidMount(){
        return this.props.isAuthenticated && this.props.signOutUser();
    }

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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUser: () => dispatch(signOutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);