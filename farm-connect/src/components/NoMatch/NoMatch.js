import React from 'react';
import { withRouter } from 'react-router-dom';

const NoMatch = (props) => {
    return (
        <h4>
            404 - Pathname <span style={{color:"red"}}>"{props.location.pathname}"</span> not found
        </h4>
    )
}

export default withRouter(NoMatch);