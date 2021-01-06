import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
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
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUpUser(this.state, this.props.errorMessages);

        this.setState({
            user: {
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                email: "",
                password: "",
                type: ""
            }
        });
    }

    handleSwitchToSignIn = () => {
        this.props.errorMessages[0] && this.props.clearErrorMessages();
        this.props.history.push("/");
    }

    render(){
        return(
            <div className="main_div">
                <SignUpForm
                    firstName={this.state.user.firstName}
                    lastName={this.state.user.lastName}
                    dateOfBirth={this.state.user.dateOfBirth}
                    email={this.state.user.email}
                    password={this.state.user.password}
                    type={this.state.user.type}
                    errorMessages={this.props.errorMessages}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                />

                <button className="SignUp_signin_button" onClick={this.handleSwitchToSignIn}>Sign In</button>
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
        signUpUser: (payload, errorMessages) => dispatch(signUpUser(payload, errorMessages, ownProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);