import React from 'react';
import { withRouter } from 'react-router-dom';
import SuggestedProspects from '../SuggestedProspects/SuggestedProspects';
import ListingsInterests from '../ListingsInterests/ListingsInterests';

const ResourcesBoard = (props) => {
    return (
        <div style={{width: "20%", height:"100%", display: "inline", float: "left", backgroundColor: "#FFF"}}>
            <ListingsInterests {...props} />
            <SuggestedProspects {...props} />
        </div>
    )
}

export default withRouter(ResourcesBoard);