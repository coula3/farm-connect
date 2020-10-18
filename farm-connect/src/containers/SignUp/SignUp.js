import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        }, ()=> console.log(this.state))
    }

    render(){
        return(
            <div style={{margin: "auto", width: "30%", border: "solid 1px grey", boxShadow: "10px 10px grey", borderRadius: "10px", paddingBottom: 15}}>
                <form style={{padding: 10, marginBottom: "5px"}}>
                    <p><input type="text" name="firstName" placeholder="first name" value={this.state.user.firstName} onChange={this.handleChange} /></p>
                    <p><input type="text" name="lastName" placeholder="last name" value={this.state.user.lastName} onChange={this.handleChange} /></p>
                    <p><input type="date" name="dateOfBirth" value={this.state.user.dateOfBirth} onChange={this.handleChange} /></p>
                    <p><input type="text" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange} /></p>
                    <p><input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange} /></p>
                    <div>
                        <div style={{display: "inline", marginRight: 15}}>
                            <label htmlFor="Farmer">Farmer</label>
                            <input type="radio" name="type" value="Farmer" onChange={this.handleChange} checked={this.state.user.type === "Farmer"} />
                        </div>
                        <div style={{display: "inline", marginRight: 15}}>
                            <label htmlFor="Prospect">Prospect</label>
                            <input type="radio" name="type"  value="Prospect" onChange={this.handleChange} checked={this.state.user.type === "Prospect"} />
                        </div>
                    </div>
                    <br />
                    <button>Sign Up</button>
                </form>
                <Link to="/">Sign In</Link>
            </div>
        )
    }
}

export default SignUp;