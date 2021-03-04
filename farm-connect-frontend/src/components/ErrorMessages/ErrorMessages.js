import React, { useEffect } from 'react';
import './ErrorMessages.css';

const ErrorMessages = (props) => {
    const { errorMessages, history, clearErrorMessages } = props;

    useEffect(() => {
        errorMessages.length === 0 && history.replace("/listings");

        return () => {
            clearErrorMessages();
        }
    }, [errorMessages, history, clearErrorMessages])

    useEffect(() => {
        document.getElementById("mobile-resources-board").style.cssText += "display: none;";
        return () => document.getElementById("mobile-resources-board").style.removeProperty('display');
    }, []);

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