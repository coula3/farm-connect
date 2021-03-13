import React, { useState, useEffect } from 'react';

import BackDrop from '../Backdrop/Backdrop';
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
                <h1>MobileResourcesBoard</h1>
            </div>
        </>
    )
}

export default MobileResourcesBoard;