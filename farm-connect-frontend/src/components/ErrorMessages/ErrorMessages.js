import React from 'react';
import './ErrorMessages.css';
import history from '../../utils/history';

const ErrorMessages = (props) => {
    return (
        <div className="ErrorMessage_main_div">
            {console.log(props)}
            <div className="error_message_card">
                <input id="err_msg_close_btn" type="submit" value="X" onClick={() => history.goBack()}/>
                <h5 style={{clear:"both", marginTop:"40px"}}>{props.errMessage}</h5>
            </div>
        </div>
    )
}

export default ErrorMessages;