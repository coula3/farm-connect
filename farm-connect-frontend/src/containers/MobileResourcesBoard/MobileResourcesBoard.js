import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import BackDrop from "../../components/Backdrop/Backdrop";
import ListingsInterests from "../../components/ListingsInterests/ListingsInterests";
import SuggestedProspects from "../../components/SuggestedProspects/SuggestedProspects";

import "./MobileResourcesBoard.css";

const MobileResourcesBoard = (props) => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [assignedClass, setAssignedClass] = useState(
    "CloseMobileResourcesBoard"
  );

  useEffect(() => {
    setShowBackDrop(true);
    setAssignedClass("OpenMobileResourcesBoard");
  }, []);

  const handleClick = () => {
    setAssignedClass("CloseMobileResourcesBoard");
    setShowBackDrop(false);
    setTimeout(() => props.hideMobileResourcesBoard(), 350);
  };

  return (
    <>
      <BackDrop show={showBackDrop} closeBackdrop={() => handleClick()} />

      <div
        id="mobile-resources-board"
        className={assignedClass}
        onClick={() => handleClick()}
      >
        <ListingsInterests {...props} />
        <SuggestedProspects {...props} userId={props.userId} />
      </div>
    </>
  );
};

export default withRouter(MobileResourcesBoard);
