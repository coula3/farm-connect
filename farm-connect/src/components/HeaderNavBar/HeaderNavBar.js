import React from 'react';

const HeadNavBar = (props) => {
    return (
        <div style={{marginBottom:"15px"}}>
            <span style={{marginRight: "15px"}}>{props.userAttributes.first_name} {props.userAttributes.last_name}</span>
            <button>Sign Out</button>
        </div>
    )
}

export default HeadNavBar;