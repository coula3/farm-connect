import React, { useEffect } from 'react';

const SignInForm = props => {
    useEffect(() => {
        return () => props.errorMessages[0] && props.clearErrorMessages();
    })

    return (
        <>
            <form id="signin_form" onSubmit={props.handleSubmit}>
                <p><input id="signin-email" className="signin_inputs" type="text" name="email" placeholder="email" value={props.email} onChange={props.handleChange} /></p>
                <p><input id="signin-password" className="signin_inputs" type="password" name="password" placeholder="password" value={props.password} onChange={props.handleChange} /></p>
                <p id="errors_p">{props.errorMessages ? props.errorMessages : ""}</p>
                <button id="signin_button" className="signin_button">Sign In</button>
            </form>
            <button className="signup_button" onClick={props.handleSwitchToSignUp}>Sign Up</button>
        </>
    )
};

export default SignInForm;