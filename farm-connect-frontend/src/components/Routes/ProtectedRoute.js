import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
        isAuthenticated,
        component: Component,
        ...rest
    }) => {
    return (
        <Route {...rest} render={(props) => {
            return isAuthenticated
                ?   <Component {...props} />
                :   <Redirect to="/" />
        }} />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
    }
}

export default connect(mapStateToProps)(ProtectedRoute);