import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';

import BackDrop from '../Backdrop/Backdrop';
import ListingsInterests from '../ListingsInterests/ListingsInterests';
import SuggestedProspects from '../SuggestedProspects/SuggestedProspects';
import './ResourcesBoard.css';

const MobileResourcesBoard = (props) => {
    const [showBackDrop, setShowBackDrop] = useState(false);

    useEffect(() => {
        setShowBackDrop(true);
    }, []);

    const handleClick = () => {
        setShowBackDrop(false);
        props.hideMobileResourcesBoard();
    }

    return (
        <>
            <BackDrop show={showBackDrop} closeBackdrop={() => handleClick()} />

            <div id="mobile-resources-board" onClick={() => handleClick()}>
                <ListingsInterests {...props} />
                <SuggestedProspects {...props} userId={props.userId}/>
            </div>
        </>
    )
}

export default withRouter(MobileResourcesBoard);