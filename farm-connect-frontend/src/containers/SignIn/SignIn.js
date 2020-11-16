import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import './SignIn.css';

class SignIn extends Component {
    state = {
        user: {
            email: "",
            password: ""
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

    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push("/listings");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signInUser(this.state)

        this.setState({
            user: {
                email: "",
                password: ""
            }
        })
    }

    handleSwitchToSignUp = () => {
        this.props.errorMessages[0] && this.props.clearErrorMessages();
        this.props.history.push("/signup");
    }

    componentWillUnmount(){
        this.props.errorMessages[0] && this.props.clearErrorMessages();
    }

    render() {
        return (
            <div className="main_div">
                <form id="signin_form" onSubmit={this.handleSubmit}>
                    <p><input type="text" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange} /></p>
                    <p><input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange} /></p>
                    <p id="p_errors">{this.props.errorMessages.length > 0 ? this.props.errorMessages[0] : ""}</p>
                    <button id="button">Sign In</button>
                </form>
                <button onClick={this.handleSwitchToSignUp}>Sign Up</button>
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
        signInUser: (payload) => dispatch(signInUser(payload, ownProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);