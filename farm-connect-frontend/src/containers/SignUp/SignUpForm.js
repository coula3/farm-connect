import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as messages from '../../utils/errorsUtils/userErrors';

const SignUpForm = props => {
    const { errorMessages, clearErrorMessages } = props;
    const signupEmailInputRef = React.useRef();

    useEffect(() => {
        return () => errorMessages[0] && clearErrorMessages();
    }, [errorMessages, clearErrorMessages]);

    useEffect(() => {
        signupEmailInputRef.current.focus();
    }, []);

    return (
        <>
            <form id="signup-form" onSubmit={props.handleSubmit}>
                <p className="signup-inputs-p"><input id="signup-firstname-input" ref={signupEmailInputRef} className="signup-inputs" type="text" name="firstName" placeholder="first name" value={props.firstName} onChange={props.handleChange} /></p>
                <p className="signup-errors-p signup-errors-p-margin">{messages.firstNameError(props.errorMessages)}</p>

                <p className="signup-inputs-p"><input id="signup-lastname-input" className="signup-inputs" type="text" name="lastName" placeholder="last name" value={props.lastName} onChange={props.handleChange} /></p>
                <p className="signup-errors-p signup-errors-p-margin">{messages.lastNameError(props.errorMessages)}</p>

                <label id="signup-dob-label">date of birth</label>
                <p id="signup-dob-p">
                    <input id="signup-dob-input" type="date" name="dateOfBirth" value={props.dateOfBirth} onChange={props.handleChange} />
                </p>
                <p className="signup-errors-p signup-errors-p-margin">{messages.dateOfBirthError(props.errorMessages)}</p>

                <p className="signup-inputs-p"><input id="signup-email-input" className="signup-inputs" type="text" name="email" placeholder="email" value={props.email} onChange={props.handleChange} /></p>
                <p className="signup-errors-p signup-errors-p-margin">{messages.emailError(props.errorMessages)}</p>

                <p className="signup-inputs-p"><input id="signup-password-input" className="signup-inputs" type="password" name="password" placeholder="password" value={props.password} onChange={props.handleChange} /></p>
                <p className="signup-errors-p signup-errors-p-margin">{messages.passwordError(props.errorMessages)}</p>

                <div id="type-div">
                    <div id="farmer-type-div">
                        <label className="type-lbl" htmlFor="farmer">farmer</label>
                        <input className="margin_radio_input" type="radio" id="farmer" name="type" value="Farmer" onChange={props.handleChange} checked={props.type === "Farmer"} />
                    </div>
                    <div id="prospect-type-div">
                        <label className="type-label" htmlFor="prospect">prospect</label>
                        <input className="margin-radio-input" type="radio" id="prospect" name="type"  value="Prospect" onChange={props.handleChange} checked={props.type === "Prospect"} />
                    </div>
                </div>
                <p className="signup-errors-p signup-errors-p-margin">{messages.typeError(props.errorMessages)}</p>

                <p id="signup-service-terms-p">By signing up, you agree to our <Link id="service-terms-link" to="/terms-of-service">Terms of Service</Link>.</p>

                <button id="signup-button" className="signup-button">Sign Up</button>
            </form>

            <div id="switch-btn-div">
                <button className="signup-signin-button" onClick={props.handleSwitchToSignIn}>Sign In</button>
            </div>
        </>
    )
}

export default SignUpForm;