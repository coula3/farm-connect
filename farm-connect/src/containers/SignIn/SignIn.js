import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/userActions';

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

    render() {
        return (
            <div style={{margin: "auto", width: "30%", border: "solid 1px grey", boxShadow: "10px 10px grey", borderRadius: "10px", paddingBottom: 15}}>
                <form style={{padding: 10, marginBottom: "5px"}} onSubmit={this.handleSubmit}>
                    <p><input type="text" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange} /></p>
                    <p><input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange} /></p>
                    <button>Sign In</button>
                </form>
                <Link to="/signup">Sign Up</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        isLoading: state.currentUser.isLoading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signInUser: (payload) => dispatch(signInUser(payload, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);