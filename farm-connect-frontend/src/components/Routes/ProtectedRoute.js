import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
        isAuthenticated,
        commodities,
        component: Component,
        ...rest
    }) => {
    return (
        <Route {...rest} render={(props) => {
            return isAuthenticated
                ?   <Component {...props}
                        commodities={commodities} />
                :   <Redirect to="/" />
        }} />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
        commodities: state.commodities.commodities
    }
}

export default connect(mapStateToProps)(ProtectedRoute);