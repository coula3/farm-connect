import React, { useEffect } from "react";

const SignInForm = (props) => {
  const { errorMessages, clearErrorMessages } = props;
  const signinEmailInputRef = React.useRef();

  useEffect(() => {
    return () => errorMessages[0] && clearErrorMessages();
  }, [errorMessages, clearErrorMessages]);

  useEffect(() => {
    signinEmailInputRef.current.focus();
  }, []);

  return (
    <>
      <form id="signin-form" onSubmit={props.handleSubmit}>
        <p>
          <input
            id="signin-email"
            ref={signinEmailInputRef}
            className="signin-inputs"
            type="text"
            name="email"
            placeholder="email"
            value={props.email}
            onChange={props.handleChange}
          />
        </p>
        <p>
          <input
            id="signin-password"
            className="signin-inputs"
            type="password"
            name="password"
            placeholder="password"
            value={props.password}
            onChange={props.handleChange}
          />
        </p>
        <p id="signin-error-p">
          {props.errorMessages ? props.errorMessages : ""}
        </p>
        <button id="signin-button" className="signin-button">
          Sign In
        </button>
      </form>
      <button id="signin-signup-button" onClick={props.handleSwitchToSignUp}>
        Sign Up
      </button>
    </>
  );
};

export default SignInForm;
