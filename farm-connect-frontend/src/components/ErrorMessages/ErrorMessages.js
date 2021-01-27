import React, { useEffect } from 'react';
import './ErrorMessages.css';
import history from '../../utils/history';

const ErrorMessages = (props) => {
    useEffect(() => {
        !props.errMessage && props.history.replace("/listings");
    }, [props])

    return (
        <div className="ErrorMessage_main_div">
            <div className="error_message_card">
                <input id="err_msg_close_btn" type="submit" value="X" onClick={() => history.goBack()}/>
                <h5 id="err_h5">{props.errMessage}</h5>
            </div>
        </div>
    )
}

export default ErrorMessages;