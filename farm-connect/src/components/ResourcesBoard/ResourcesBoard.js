import React from 'react';
import Prospects from '../Prospects/Prospects';

const ResourcesBoard = (props) => {
    return (
        <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
            <Prospects {...props} />
        </div>
    )
}

export default ResourcesBoard;