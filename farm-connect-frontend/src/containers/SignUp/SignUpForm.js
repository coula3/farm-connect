import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as messages from '../../utils/errorsUtils/userErrors';

const SignUpForm = props => {
    useEffect(() => {
        return () => props.errorMessages[0] && props.clearErrorMessages();
    })

    return (
        <>
            <form id="signup_form" onSubmit={props.handleSubmit}>
                <p className="inputs_p"><input id="signup_firstname_input" className="signup_inputs" type="text" name="firstName" placeholder="first name" value={props.firstName} onChange={props.handleChange} /></p>
                <p className="errors_p errors_p_margin">{messages.firstNameError(props.errorMessages)}</p>

                <p className="inputs_p"><input id="signup_lastname_input" className="signup_inputs" type="text" name="lastName" placeholder="last name" value={props.lastName} onChange={props.handleChange} /></p>
                <p className="errors_p errors_p_margin">{messages.lastNameError(props.errorMessages)}</p>

                <label id="dob_label">date of birth</label>
                <p id="dob_p">
                    <input id="signup_dob_input" type="date" name="dateOfBirth" value={props.dateOfBirth} onChange={props.handleChange} />
                </p>
                <p className="errors_p errors_p_margin">{messages.dateOfBirthError(props.errorMessages)}</p>

                <p className="inputs_p"><input id="signup_email_input" className="signup_inputs" type="text" name="email" placeholder="email" value={props.email} onChange={props.handleChange} /></p>
                <p className="errors_p errors_p_margin">{messages.emailError(props.errorMessages)}</p>

                <p className="inputs_p"><input id="signup_password_input" className="signup_inputs" type="password" name="password" placeholder="password" value={props.password} onChange={props.handleChange} /></p>
                <p className="errors_p errors_p_margin">{messages.passwordError(props.errorMessages)}</p>

                <div id="type_div">
                    <div id="farmer_type_div">
                        <label className="type_lbl" htmlFor="farmer">farmer</label>
                        <input className="margin_radio_input" type="radio" id="farmer" name="type" value="Farmer" onChange={props.handleChange} checked={props.type === "Farmer"} />
                    </div>
                    <div id="prospect_type_div">
                        <label className="type_lbl" htmlFor="prospect">prospect</label>
                        <input className="margin_radio_input" type="radio" id="prospect" name="type"  value="Prospect" onChange={props.handleChange} checked={props.type === "Prospect"} />
                    </div>
                </div>
                <p className="errors_p errors_p_margin">{messages.typeError(props.errorMessages)}</p>

                <p id="service_terms_p">By signing up, you agree to our <Link id="service_terms_link" to="/terms-of-service">Terms of Service</Link>.</p>
                <button id="signup_button" className="SignUp_signup_button">Sign Up</button>
            </form>

            <div id="switch_btn_div"><button className="SignUp_signin_button" onClick={props.handleSwitchToSignIn}>Sign In</button></div>
        </>
    )
}

export default SignUpForm;