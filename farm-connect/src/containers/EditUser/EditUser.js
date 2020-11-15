import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import * as messages from '../../utils/errorsUtils/userErrors';
import './EditUser.css';

class EditUser extends Component {
    state = {
        user: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            photo: {}
        },
        editMode: false
    }

    componentWillUnmount(){
        this.props.errorMessages[0] && this.props.clearErrorMessages();
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

            if(e.target.name === "photo"){
                this.setState({
                    user: {
                        ...this.state.user,
                        photo: e.target.files[0]
                    }
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.props.userId, this.state)
    }

    handleCancelEdit = (e) => {
        e.preventDefault();
        this.props.history.push(`/users/${this.props.userId}`)
    }

    getFirstName = (firstNameProps) => {
        return this.state.editMode ? this.state.user.firstName : firstNameProps;
    }

    getLastName = (lastNameProps) => {
        return this.state.editMode ? this.state.user.lastName : lastNameProps;
    }

    getDateOfBirth = (dateOfBirthProps) => {
        return this.state.editMode ? this.state.user.dateOfBirth : dateOfBirthProps.slice(0, 10);
    }

    getEmail = (emailProps) => {
        return this.state.editMode ? this.state.user.email : emailProps;
    }

    render(){
        return (
            <div className="EditUser_main_div">
                <h3>Edit Profile</h3>
                <form id="signup_form"  onSubmit={this.handleSubmit}>
                    <p className="p_inputs"><input type="text" name="firstName" value={this.getFirstName(this.props.userAttributes.first_name)} onFocus={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <p className="p_errors">{messages.firstNameError(this.props.errorMessages)}</p>
                    <p className="p_inputs"><input type="text" name="lastName" value={this.getLastName(this.props.userAttributes.last_name)} onFocus={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <p className="p_errors">{messages.lastNameError(this.props.errorMessages)}</p>
                    <p className="p_inputs"><input type="date" name="dateOfBirth" value={this.getDateOfBirth(this.props.userAttributes.date_of_birth)} onClick={this.handleSwitchState} onChange={this.handleChange}  /></p>
                    <p className="p_errors">{messages.dateOfBirthError(this.props.errorMessages)}</p>
                    <p className="p_inputs"><input type="text" name="email" value={this.getEmail(this.props.userAttributes.email)} onFocus={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <p className="p_errors">{messages.emailError(this.props.errorMessages)}</p>
                    <p><input type="file" name="photo" accept="image/png, image/jpeg" onClick={this.handleSwitchState} onChange={this.handleChange} /></p>
                    <br />
                    <button disabled={!this.state.editMode}>Update</button>
                    <button onClick={this.handleCancelEdit}>Cancel Edit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        errorMessages: state.errorMessages.errorMessages
    }
}

const mapDispatchToProp = (dispatch, ownProps) => {
    return {
        editUser: (userId, payload) => dispatch(editUser(userId, payload, ownProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(EditUser);