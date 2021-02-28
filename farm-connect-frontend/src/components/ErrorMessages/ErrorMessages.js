import React, { useEffect } from 'react';
import './ErrorMessages.css';

const ErrorMessages = (props) => {
    const { errorMessages, history } = props;

    useEffect(() => {
        errorMessages.length === 0 && history.replace("/listings");

    }, [errorMessages, history])

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