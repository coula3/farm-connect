import React, { Component } from "react";

class EditUser extends Component {

    state = {
        user: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: ""
        }
    }

    render(){
        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <form style={{padding: 10, marginBottom: "5px"}} >
                    <p><input type="text" name="firstName" /></p>
                    <p><input type="text" name="lastName" /></p>
                    <p><input type="date" name="dateOfBirth" /></p>
                    <p><input type="text" name="email" /></p>
                    <br />
                    <button>Update</button>
                </form>
            </div>
        )
    }
}

export default EditUser;