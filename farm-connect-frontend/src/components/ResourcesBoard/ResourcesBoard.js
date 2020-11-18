import React from 'react';
import { withRouter } from 'react-router-dom';
import SuggestedProspects from '../SuggestedProspects/SuggestedProspects';
import ListingsInterests from '../ListingsInterests/ListingsInterests';
import './ResourcesBoard.css';

const ResourcesBoard = (props) => {
    return (
        <div className="ResourcesBoard_main_div">
            <ListingsInterests {...props} />
            <SuggestedProspects {...props} userId={props.userId}/>
        </div>
    )
}

export default withRouter(ResourcesBoard);