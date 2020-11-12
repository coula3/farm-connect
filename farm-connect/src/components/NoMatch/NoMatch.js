import React from 'react';
import { withRouter } from 'react-router-dom';
import sadEmoji from '../../assets/sadEmoji.png';

const NoMatch = (props) => {
    return (
        <>
            <h4>
                404 - Pathname <span style={{color:"red"}}>"{props.location.pathname}"</span> not found
            </h4>
            <img src={sadEmoji} alt="sad face" style={{marginTop:"15px", height:"20px", width:"20px"}}></img>
        </>
    )
}

export default withRouter(NoMatch);