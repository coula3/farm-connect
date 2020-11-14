import React from 'react';
import { withRouter } from 'react-router-dom';
import SuggestedProspects from '../SuggestedProspects/SuggestedProspects';
import ListingsInterests from '../ListingsInterests/ListingsInterests';

const ResourcesBoard = (props) => {
    return (
        <div style={{width: "19.7%", display: "inline", float: "left", border: "solid 1px"}}>
            <ListingsInterests {...props} />
            <SuggestedProspects {...props} />
        </div>
    )
}

export default withRouter(ResourcesBoard);