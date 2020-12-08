import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions/userActions';

class SignOut extends React.Component {
    componentDidMount(){
        this.props.isAuthenticated && this.props.signOutUser();
    }

    render(){
        return <Redirect to="/" />;
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