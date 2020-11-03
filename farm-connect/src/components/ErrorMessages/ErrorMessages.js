import React from 'react';

const ErrorMessages = (props) => {
    return (
        <>
            {
                props.message ?
                <div style={{width:"60%", margin:"auto", backgroundColor:"#f2eeed", borderRadius:"15px", padding:5}}>{props.message}</div> :
                null
            }
        </>
    )        
}

export default ErrorMessages;