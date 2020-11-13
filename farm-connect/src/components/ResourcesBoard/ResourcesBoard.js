import React from 'react';
import SuggestedProspects from '../SuggestedProspects/SuggestedProspects';
import ListingsInterests from '../ListingsInterests/ListingsInterests';

const ResourcesBoard = (props) => {
    return (
        <div style={{width: "18%", display: "inline", float: "left", border: "solid 1px"}}>
            <ListingsInterests {...props} />
            <SuggestedProspects {...props} />
        </div>
    )
}

export default ResourcesBoard;