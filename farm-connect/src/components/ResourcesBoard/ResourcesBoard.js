import React from 'react';
import Prospects from '../Prospects/Prospects';
import ListingsInterests from '../ListingsInterests/ListingsInterests';

const ResourcesBoard = (props) => {
    return (
        <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
            <ListingsInterests {...props} />
            <Prospects {...props} />
        </div>
    )
}

export default ResourcesBoard;