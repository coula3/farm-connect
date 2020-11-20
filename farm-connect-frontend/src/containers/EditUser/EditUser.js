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
                                    <td style={{textAlign:"right", fontSize:"17px", verticalAlign:"top"}}>First name</td>
                                    <td>
                                        <input style={{width: "75%", fontSize:"17px", padding:"5px 10px", float:"left", marginLeft:"35px", borderRadius:"5px", border: "grey solid 1px"}} type="text" name="firstName" value={this.getFirstName(this.props.userAttributes.first_name)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                                        <br />
                                        <span className="p_errors">{messages.firstNameError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{paddingTop:"10px", fontSize:"17px", textAlign:"right", verticalAlign:"top"}}>Last name</td>
                                    <td>
                                        <input style={{marginTop:"10px", width: "75%", fontSize:"17px", padding:"5px 10px", float:"left", marginLeft:"35px", borderRadius:"5px", border: "grey solid 1px"}} type="text" name="lastName" value={this.getLastName(this.props.userAttributes.last_name)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                                        <br />
                                        <span className="p_errors">{messages.lastNameError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{paddingTop:"10px", fontSize:"17px", textAlign:"right", verticalAlign:"top"}}>Date of birth</td>
                                    <td>
                                        <input style={{marginTop:"10px", width: "75%", fontSize:"17px", padding:"5px 10px", float:"left", marginLeft:"35px", borderRadius:"5px", border: "grey solid 1px"}} type="date" name="dateOfBirth" value={this.getDateOfBirth(this.props.userAttributes.date_of_birth)} onClick={this.handleSwitchState} onChange={this.handleChange}  />
                                        <br />
                                        <span className="p_errors">{messages.dateOfBirthError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{paddingTop:"10px", fontSize:"17px", textAlign:"right", verticalAlign:"top"}}>Email</td>
                                    <td>
                                        <input style={{marginTop:"10px", width: "75%", fontSize:"17px", padding:"5px 10px", float:"left", marginLeft:"35px", borderRadius:"5px", border: "grey solid 1px"}} type="text" name="email" value={this.getEmail(this.props.userAttributes.email)} onFocus={this.handleSwitchState} onChange={this.handleChange} />
                                        <br />
                                        <span className="p_errors">{messages.emailError(this.props.errorMessages)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{paddingTop:"10px", fontSize:"17px", textAlign:"right", verticalAlign:"top"}}>Upload Photo</td>
                                    <td><input style={{marginTop:"10px", fontSize:"17px", float:"left", marginLeft:"35px"}} type="file" name="photo" accept="image/png, image/jpeg" onClick={this.handleSwitchState} onChange={this.handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{marginTop:"40px"}}>
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