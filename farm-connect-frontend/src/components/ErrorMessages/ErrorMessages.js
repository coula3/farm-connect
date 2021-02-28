import React, { useEffect } from 'react';
import './ErrorMessages.css';
import history from '../../utils/history';

const ErrorMessages = (props) => {
    useEffect(() => {
        !props.errorMessages && !props.farmer.id && props.history.replace("/listings");

    }, [props])

    return (
        <div className="ErrorMessage-main-div">
            <div className="error-message-card">
                <input id="err-msg-close-btn" type="submit" value="X" onClick={() => history.goBack()}/>
                <h5 id="err-msg-h5">{props.errorMessages[0]}</h5>
            </div>
        </div>
    )
}

export default ErrorMessages;