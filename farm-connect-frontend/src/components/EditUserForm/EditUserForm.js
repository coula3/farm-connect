import React from 'react';
import * as messages from '../../utils/errorsUtils/userErrors';

const EditUserForm = props => (
    <>
        <form id="signup_form"  onSubmit={props.handleSubmit}>
            <table className="center">
                <tbody>
                    <tr>
                        <td className="caption_td">First name</td>
                        <td>
                            <input className="user_inputs" type="text" name="firstName" value={props.getFirstName(props.firstName)} onFocus={props.handleSwitchState} onChange={props.handleChange} />
                            <br />
                            <span id="" className="p_errors name_error_padding">{messages.firstNameError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="caption_td td_padding">Last name</td>
                        <td>
                            <input className="user_inputs input_margin" type="text" name="lastName" value={props.getLastName(props.lastName)} onFocus={props.handleSwitchState} onChange={props.handleChange} />
                            <br />
                            <span className="p_errors name_error_padding">{messages.lastNameError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="caption_td td_padding">Date of birth</td>
                        <td>
                            <input className="user_inputs input_margin" type="date" name="dateOfBirth" value={props.getDateOfBirth(props.dateOfBirth)} onClick={props.handleSwitchState} onChange={props.handleChange}  />
                            <br />
                            <span id="dob_error_padding" className="p_errors">{messages.dateOfBirthError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="caption_td td_padding">Email</td>
                        <td>
                            <input className="user_inputs input_margin" type="text" name="email" value={props.getEmail(props.email)} onFocus={props.handleSwitchState} onChange={props.handleChange} />
                            <br />
                            <span id="email_error_padding" className="p_errors error_padding">{messages.emailError(props.errorMessages)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="caption_td td_padding">Upload Photo</td>
                        <td><input id="photo_input" type="file" name="photo" accept="image/png, image/jpeg" onClick={props.handleSwitchState} onChange={props.handleChange} /></td>
                    </tr>
                </tbody>
            </table>

            <div id="user_edit_btn_div">
                <button className={`${props.setUpdateBtnColor()} eu_el_btns`} disabled={!props.editMode}>Update</button>
                <br />
                <button className="global_btn eu_el_btns" onClick={props.handleCancelEdit}>Cancel</button>
            </div>
        </form>
    </>
)

export default EditUserForm;