import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import * as messages from '../../utils/errorsUtils/userErrors';
import './SignUp.css';

class SignUp extends Component {
    state = {
        user: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            password: "",
            type: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUpUser(this.state)

        this.setState({
            user: {
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                email: "",
                password: "",
                type: ""
            }
        })
    }

    handleSwitchToSignIn = () => {
        this.props.errorMessages[0] && this.props.clearErrorMessages();
        this.props.history.push("/");
    }

    componentWillUnmount(){
        this.props.errorMessages[0] && this.props.clearErrorMessages();
    }

    render(){
        return(
            <div className="main_div">
                <form id="signup_form" onSubmit={this.handleSubmit}>
                    <p className="inputs_p"><input className="sign_up_in_input" type="text" name="firstName" placeholder="first name" value={this.state.user.firstName} onChange={this.handleChange} /></p>
                    <p className="errors_p errors_p_margin">{messages.firstNameError(this.props.errorMessages)}</p>
                    <p className="inputs_p"><input className="sign_up_in_input" type="text" name="lastName" placeholder="last name" value={this.state.user.lastName} onChange={this.handleChange} /></p>
                    <p className="errors_p errors_p_margin">{messages.lastNameError(this.props.errorMessages)}</p>
                    <p id="dob_p"><span id="dob_span">date of birth</span><input id="dob_input" type="date" name="dateOfBirth" value={this.state.user.dateOfBirth} onChange={this.handleChange} /></p>
                    <p className="errors_p errors_p_margin">{messages.dateOfBirthError(this.props.errorMessages)}</p>
                    <p className="inputs_p"><input className="sign_up_in_input" type="text" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange} /></p>
                    <p className="errors_p errors_p_margin">{messages.emailError(this.props.errorMessages)}</p>
                    <p className="inputs_p"><input className="sign_up_in_input" type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange} /></p>
                    <p className="errors_p errors_p_margin">{messages.passwordError(this.props.errorMessages)}</p>
                    <div id="type_div">
                        <div id="farmer_type_div">
                            <label className="type_lbl" htmlFor="farmer">farmer</label>
                            <input type="radio" id="farmer" name="type" value="Farmer" onChange={this.handleChange} checked={this.state.user.type === "Farmer"} />
                        </div>
                        <div id="prospect_type_div">
                            <label className="type_lbl" htmlFor="prospect">prospect</label>
                            <input type="radio" id="prospect" name="type"  value="Prospect" onChange={this.handleChange} checked={this.state.user.type === "Prospect"} />
                        </div>

                        <p id="type_error_p" className="errors_p_margin">{messages.typeError(this.props.errorMessages)}</p>
                    </div>
                    <br />
                    <button>Sign Up</button>
                </form>
                <button onClick={this.handleSwitchToSignIn}>Sign In</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        isLoading: state.currentUser.isLoading,
        isAuthenticated: state.currentUser.isAuthenticated,
        errorMessages: state.errorMessages.errorMessages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signUpUser: (payload) => dispatch(signUpUser(payload, ownProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);