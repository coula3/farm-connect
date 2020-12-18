import React from 'react';

const SignInForm = props => (
    <>
        <form id="signin_form" onSubmit={props.handleSubmit}>
            <p><input id="signin-email" className="sign_up_in_input" type="text" name="email" placeholder="email" value={props.email} onChange={props.handleChange} /></p>
            <p><input id="signin-password" className="sign_up_in_input" type="password" name="password" placeholder="password" value={props.password} onChange={props.handleChange} /></p>
            <p id="errors_p">{props.errorMessages ? props.errorMessages : ""}</p>
            <button id="signin_button" className="signin_button">Sign In</button>
        </form>
        <button className="signup_button" onClick={props.handleSwitchToSignUp}>Sign Up</button>
        <br />
    </>
)

export default SignInForm;