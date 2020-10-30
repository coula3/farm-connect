import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    <p><input type="text" name="firstName" value={this.props.userAttributes.first_name} /></p>
                    <p><input type="text" name="lastName" value={this.props.userAttributes.last_name} /></p>
                    <p><input type="date" name="dateOfBirth" value={this.props.userAttributes.date_of_birth.slice(0, 10)} /></p>
                    <p><input type="text" name="email" value={this.props.userAttributes.email} /></p>
                    <br />
                    <button>Update</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userAttributes: state.currentUser.userAttributes
    }

}

export default connect(mapStateToProps)(EditUser);