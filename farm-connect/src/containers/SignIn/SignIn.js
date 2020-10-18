import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

        fetch(`http://localhost:3000/api/v1/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(json => {
            if(json.jwt){
                localStorage.setItem('jwt_token', json.jwt);
                this.props.history.push(`/main`);
                console.log(json)
            } else {
                console.log(json)
            }
        })

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

export default SignIn;