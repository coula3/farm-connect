import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userActions';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

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
        this.props.history.push("/signup")
    }

    renderErrorMessages = () => {
        if(this.props.message){
            return <ErrorMessages message={this.props.message} />
        } else {
            return null
        }
    }

    render() {
        return (
            <div style={{margin: "auto", width: "40%", border: "solid 1px grey", boxShadow: "10px 10px grey", borderRadius: "10px", padding:"15px 0px 15px 0px"}}>
                {this.renderErrorMessages()}
                <form style={{padding: 10, marginBottom: "5px"}} onSubmit={this.handleSubmit}>
                    <p><input type="text" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange} /></p>
                    <p><input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange} /></p>
                    <button>Sign In</button>
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
        message: state.currentUser.message
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signInUser: (payload) => dispatch(signInUser(payload, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);