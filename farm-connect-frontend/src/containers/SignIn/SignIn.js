import React, { useState } from "react";
import { connect } from "react-redux";

import SignInForm from "./SignInForm";

import { signInUser } from "../../actions/userActions";
import { clearErrorMessages } from "../../actions/errorActions";

import "./SignIn.css";

const SignIn = (props) => {
  const [state, setState] = useState({ user: { email: "", password: "" } });

  const handleChange = (e) => {
    setState((previousState) => ({
      user: {
        ...previousState.user,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signInUser(state);

    setState({
      user: {
        email: "",
        password: "",
      },
    });
  };

  const handleSwitchToSignUp = () => {
    props.errorMessages[0] && props.clearErrorMessages();
    props.history.push("/signup");
  };

  return (
    <div className="SignIn-main-div">
      <SignInForm
        email={state.user.email}
        password={state.user.password}
        errorMessages={props.errorMessages}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSwitchToSignUp={handleSwitchToSignUp}
        clearErrorMessages={() => props.clearErrorMessages()}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.currentUser.userId,
    userAttributes: state.currentUser.userAttributes,
    isLoading: state.currentUser.isLoading,
    isAuthenticated: state.currentUser.isAuthenticated,
    errorMessages: state.errorMessages.errorMessages,
  };
};

const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    signInUser: (payload) => dispatch(signInUser(payload, routerProps)),
    clearErrorMessages: () => dispatch(clearErrorMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
