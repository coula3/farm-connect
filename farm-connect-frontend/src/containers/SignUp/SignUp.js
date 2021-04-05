import React, { useState } from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";

import { signUpUser } from "../../actions/userActions";
import { clearErrorMessages } from "../../actions/errorActions";

import "./SignUp.css";

const SignUp = (props) => {
  const [state, setState] = useState({
    user: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      type: "",
    },
  });

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
    props.signUpUser(state);
  };

  const handleSwitchToSignIn = () => {
    props.errorMessages[0] && props.clearErrorMessages();
    props.history.push("/");
  };

  return (
    <div className="SignUp-main-div">
      <SignUpForm
        firstName={state.user.firstName}
        lastName={state.user.lastName}
        dateOfBirth={state.user.dateOfBirth}
        email={state.user.email}
        password={state.user.password}
        type={state.user.type}
        errorMessages={props.errorMessages}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSwitchToSignIn={handleSwitchToSignIn}
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
    signUpUser: (payload) => dispatch(signUpUser(payload, routerProps)),
    clearErrorMessages: () => dispatch(clearErrorMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
