import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import SignInForm from '../../components/SignInForm/SignInForm';
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
        });
    }

    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push("/listings");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signInUser(this.state);

        this.setState({
            user: {
                email: "",
                password: ""
            }
        });
    }

    handleSwitchToSignUp = () => {
        this.props.errorMessages[0] && this.props.clearErrorMessages();
        this.props.history.push("/signup");
    }

    render() {
        return (
            <div className="SignIn_main_div">
                <SignInForm email={this.state.user.email} password={this.state.user.password} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleSwitchToSignUp={this.handleSwitchToSignUp} errorMessages={this.props.errorMessages} />
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