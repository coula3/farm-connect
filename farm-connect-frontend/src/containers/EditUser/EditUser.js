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
        this.props.editUser(this.props.userId, this.state);
    }

    setUpdateBtnColor = () => {
        return this.state.editMode ? "update_btn" : "update_btn_disabled";
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
                <div className="edit_user_profile_card">
                    <h3>Edit Profile</h3>
                    <form id="signup_form"  onSubmit={this.handleSubmit}>
                        <table className="center">
                            <tbody>
                                <tr>
                                    <td className="caption_td">First name</td>
                                    <td>
                                        <input className="user_inputs" type="text" name="firstName" value={this.getFirstName(this.props.userAttributes.first_name)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                                        <br />
                                        <span id="" className="p_errors name_error_padding">{messages.firstNameError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="caption_td td_padding">Last name</td>
                                    <td>
                                        <input className="user_inputs input_margin" type="text" name="lastName" value={this.getLastName(this.props.userAttributes.last_name)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                                        <br />
                                        <span className="p_errors name_error_padding">{messages.lastNameError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="caption_td td_padding">Date of birth</td>
                                    <td>
                                        <input className="user_inputs input_margin" type="date" name="dateOfBirth" value={this.getDateOfBirth(this.props.userAttributes.date_of_birth)} onClick={this.handleSwitchState} onChange={this.handleChange}  />
                                        <br />
                                        <span id="dob_error_padding" className="p_errors">{messages.dateOfBirthError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="caption_td td_padding">Email</td>
                                    <td>
                                        <input className="user_inputs input_margin" type="text" name="email" value={this.getEmail(this.props.userAttributes.email)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                                        <br />
                                        <span id="email_error_padding" className="p_errors error_padding">{messages.emailError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="caption_td td_padding">Upload Photo</td>
                                    <td><input id="photo_input" type="file" name="photo" accept="image/png, image/jpeg" onClick={this.handleSwitchState} onChange={this.handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>

                        <div id="user_edit_btn_div">
                            <button className={this.setUpdateBtnColor()} disabled={!this.state.editMode}>Update</button>
                            <br />
                            <button className="global_btn" onClick={this.handleCancelEdit}>Cancel</button>
                        </div>
                    </form>
                </div>
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