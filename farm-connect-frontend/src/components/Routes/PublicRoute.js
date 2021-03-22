import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <Redirect to="/listings" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.currentUser.isAuthenticated,
  };
};

export default connect(mapStateToProps)(PublicRoute);
