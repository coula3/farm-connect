import React, { Component } from 'react';

class SignUp extends Component {
    render(){
        return(
            <div style={{margin: "auto", width: "30%", border: "solid 1px grey", boxShadow: "10px 10px grey", borderRadius: "10px", paddingBottom: 15}}>
                <form>
                    <p><input type="text" name="firstName" placeholder="first name" /></p>
                    <p><input type="text" name="lastName" placeholder="last name" /></p>
                    <p><input type="date" name="dateOfBirth" /></p>
                    <p><input type="text" name="email" placeholder="email"/></p>
                    <p><input type="password" name="password" placeholder="password"/></p>
                    <div>
                        <div style={{display: "inline", marginRight: 15}}>
                            <label htmlFor="Farmer">Farmer</label>
                            <input type="radio" name="type" value="Farmer" />
                        </div>
                        <div style={{display: "inline", marginRight: 15}}>
                            <label htmlFor="Prospect">Prospect</label>
                            <input type="radio" name="type"  value="Prospect" />
                        </div>
                    </div>
                    <br />
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;