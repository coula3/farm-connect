import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../../actions/userActions';

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
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.props.userId, this.state)
    }

    render(){
        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <form style={{padding: 10, marginBottom: "5px"}} onSubmit={this.handleSubmit}>
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
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes
    }
}

const mapDispatchToProp = (dispatch, ownProps) => {
    return {
        editUser: (userId, payload) => dispatch(editUser(userId, payload, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(EditUser);