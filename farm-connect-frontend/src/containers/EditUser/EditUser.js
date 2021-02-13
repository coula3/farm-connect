import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../../actions/userActions';
import { clearErrorMessages } from '../../actions/errorActions';
import EditUserForm from '../../components/EditUserForm/EditUserForm';
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
        return this.state.editMode ? "update-btn" : "update-btn-disabled";
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
            <div className="EditUser-main-div">
                <div className="edit-user-profile-card">
                    <h3 id="edit-user-h3">Edit Profile</h3>
                    <EditUserForm
                        firstName={this.props.userAttributes.first_name}
                        lastName={this.props.userAttributes.last_name}
                        dateOfBirth={this.props.userAttributes.date_of_birth}
                        email={this.props.userAttributes.email}
                        getFirstName={(firstName) => this.getFirstName(firstName)}
                        getLastName={(lastName) => this.getLastName(lastName)}
                        getDateOfBirth={(dateOfBirth) => this.getDateOfBirth(dateOfBirth)}
                        getEmail={(email) => this.getEmail(email)}
                        errorMessages={this.props.errorMessages}
                        handleSwitchState={this.handleSwitchState}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleCancelEdit={this.handleCancelEdit}
                        setUpdateBtnColor={() => this.setUpdateBtnColor()}
                        editMode={this.state.editMode}
                    />
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

const mapDispatchToProp = (dispatch, routerProps) => {
    return {
        editUser: (userId, payload) => dispatch(editUser(userId, payload, routerProps)),
        clearErrorMessages: () => dispatch(clearErrorMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(EditUser);