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

    handleChange = (e) => {
        this.setState({
            ...this.state.user,
            user: {
                [e.target.name]: e.target.value
            }
        })
    }

    render(){
        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <form style={{padding: 10, marginBottom: "5px"}} >
                    <p><input type="text" name="firstName" value={this.state.user.firstName ? this.state.user.firstName : this.props.userAttributes.first_name} onChange={this.handleChange} /></p>
                    <p><input type="text" name="lastName" value={this.state.user.lastName ? this.state.user.lastName : this.props.userAttributes.last_name} onChange={this.handleChange} /></p>
                    <p><input type="date" name="dateOfBirth" value={this.state.user.dateOfBirth ? this.state.user.dateOfBirth : this.props.userAttributes.date_of_birth.slice(0, 10)}onChange={this.handleChange}  /></p>
                    <p><input type="text" name="email" value={this.state.user.email ? this.state.user.email : this.props.userAttributes.email} onChange={this.handleChange} /></p>
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