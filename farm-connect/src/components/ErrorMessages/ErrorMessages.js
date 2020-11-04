import React from 'react';

const ErrorMessages = (props) => {
    const errorList = (errorMessages) => {
        let radiusValue;
        errorMessages.length == 1 ? radiusValue = 15 : radiusValue = 0;

        return errorMessages.map((message, idx) => {
            return <ul key={idx} style={{width:"60%", margin:"auto", backgroundColor:"#f2eeed", borderRadius:`${radiusValue}px`, listStyle:"none", padding:5}}>
                <li style={{fontSize:"14px"}}>{message}</li>
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