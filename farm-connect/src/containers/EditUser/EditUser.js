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
        },
        editMode: false
    }

    handleSwitchState = () => {
        if(!this.state.editMode){
            this.setState({
                editMode: true,
                user: {
                    ...this.state.user,
                    firstName: this.props.userAttributes.first_name,
                    lastName: this.props.userAttributes.last_name,
                    dateOfBirth: this.props.userAttributes.date_of_birth.slice(0, 10),
                    email: this.props.userAttributes.email
                }
            })
        }
    }

    handleChange = (e) => {
        if(this.state.editMode){
            this.setState({
                user: {
                    ...this.state.user,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.props.userId, this.state)
    }

    handleCancelEdit = () => {
        this.props.history.push(`/users/${this.props.userId}`)
    }

    render(){
        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <form style={{padding: 10, marginBottom: "5px"}} onSubmit={this.handleSubmit}>
                    <p><input type="text" name="firstName" value={this.state.user.firstName ? this.state.user.firstName : this.props.userAttributes.first_name} onClick={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <p><input type="text" name="lastName" value={this.state.user.lastName ? this.state.user.lastName : this.props.userAttributes.last_name} onClick={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <p><input type="date" name="dateOfBirth" value={this.state.user.dateOfBirth ? this.state.user.dateOfBirth : this.props.userAttributes.date_of_birth.slice(0, 10)} onClick={this.handleSwitchState} onChange={this.handleChange}  /></p>
                    <p><input type="text" name="email" value={this.state.user.email ? this.state.user.email : this.props.userAttributes.email} onClick={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <br />
                    <button>Update</button>
                    <button onClick={this.handleCancelEdit}>Cancel Edit</button>
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