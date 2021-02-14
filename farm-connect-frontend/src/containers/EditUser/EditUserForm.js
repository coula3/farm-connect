import React from 'react';
import * as messages from '../../utils/errorsUtils/userErrors';

const EditUserForm = props => (
    <>
        <form id="edit-user-form"  onSubmit={props.handleSubmit}>
            <label className="edit-user-label">First name</label>
            <input className="edit-user-input" type="text" name="firstName" value={props.getFirstName(props.firstName)} onFocus={props.handleSwitchState} onChange={props.handleChange} />
            <span className="edit-user-errors-span">{messages.firstNameError(props.errorMessages)}</span>

            <label className="edit-user-label edit-user-label-margin">Last name</label>
            <input className="edit-user-input" type="text" name="lastName" value={props.getLastName(props.lastName)} onFocus={props.handleSwitchState} onChange={props.handleChange} />
            <span className="edit-user-errors-span">{messages.lastNameError(props.errorMessages)}</span>

            <label className="edit-user-label edit-user-label-margin">Date of birth</label>
            <input className="edit-user-input" type="date" name="dateOfBirth" value={props.getDateOfBirth(props.dateOfBirth)} onClick={props.handleSwitchState} onChange={props.handleChange}  />
            <span className="edit-user-errors-span">{messages.dateOfBirthError(props.errorMessages)}</span>

            <label className="edit-user-label edit-user-label-margin">Email</label>
            <input className="edit-user-input" type="text" name="email" value={props.getEmail(props.email)} onFocus={props.handleSwitchState} onChange={props.handleChange} />
            <span className="edit-user-errors-span">{messages.emailError(props.errorMessages)}</span>

            <label id="edit-user-photo-label-margin" className="edit-user-label">Upload Photo</label>
            <p id="photo-p">
                <input id="photo-input" type="file" name="photo" accept="image/png, image/jpeg" onClick={props.handleSwitchState} onChange={props.handleChange} />
            </p>

            <div id="edit-user-btn-div">
                <button id="edit-user-update-btn" className={`${props.setUpdateBtnColor()}`} disabled={!props.editMode}>Update</button>
                <br />
                <button id="edit-user-cancel-btn" className="global-btn" onClick={props.handleCancelEdit}>Cancel</button>
            </div>
        </form>
    </>
)

export default EditUserForm;