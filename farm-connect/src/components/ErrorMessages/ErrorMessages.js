import React from 'react';

const ErrorMessages = (props) => {
    const errorList = (errorMessages) => {
        return errorMessages.map((message, idx) => {
            return <ul key={idx}>
                <li style={{width:"60%", margin:"auto", backgroundColor:"#f2eeed", borderRadius:"15px", listStyle:"none", padding:5}}>{message}</li>
            </ul>
        })
    }

    return (
        <>
            {
                props.messages ?
                    <>{errorList(props.messages)}</> :
                    null
            }
        </>
    )        
}

export default ErrorMessages;