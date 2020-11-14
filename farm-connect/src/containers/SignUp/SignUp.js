import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import * as messages from '../../utils/errorsUtils/userErrors';

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

    render(){
        return(
            <div style={{margin: "auto", width: "40%", border: "solid 1px grey", boxShadow: "10px 10px grey", borderRadius: "10px", paddingBottom: 15}}>
                <form style={{padding: 10, marginBottom:"5px"}} onSubmit={this.handleSubmit}>
                    <p style={{marginBottom:0}}><input type="text" name="firstName" placeholder="first name" value={this.state.user.firstName} onChange={this.handleChange} /></p>
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.firstNameError(this.props.errorMessages)}</p>
                    <p style={{marginBottom:0}}><input type="text" name="lastName" placeholder="last name" value={this.state.user.lastName} onChange={this.handleChange} /></p>
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.lastNameError(this.props.errorMessages)}</p>
                    <p style={{marginBottom:0}}><input type="date" name="dateOfBirth" value={this.state.user.dateOfBirth} onChange={this.handleChange} /></p>
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.dateOfBirthError(this.props.errorMessages)}</p>
                    <p style={{marginBottom:0}}><input type="text" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange} /></p>
                    <p style={{margin:"0px", fontSize:12, color:"red"}}>{messages.emailError(this.props.errorMessages)}</p>
                    <p style={{marginBottom:0}}><input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange} /></p>
                    <p style={{marginTop:"0px", fontSize:12, color:"red"}}>{messages.passwordError(this.props.errorMessages)}</p>
                    <div>
                        <div style={{display: "inline", marginRight: 15}}>
                            <label htmlFor="farmer">Farmer</label>
                            <input type="radio" id="farmer" name="type" value="Farmer" onChange={this.handleChange} checked={this.state.user.type === "Farmer"} />
                        </div>
                        <div style={{display: "inline", marginRight: 15}}>
                            <label htmlFor="prospect">Prospect</label>
                            <input type="radio" id="prospect" name="type"  value="Prospect" onChange={this.handleChange} checked={this.state.user.type === "Prospect"} />
                        </div>
                        <p style={{margin:"0px"}}>{messages.typeError(this.props.errorMessages)}</p>
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