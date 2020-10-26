import React from 'react';

const RightSide = (props) => {
    const prospects = props.prospects.map((prospect) => {
        return (
            <ul style={{listStyle:"none", paddingLeft:0}}>
                <li>{prospect.id} - {prospect.attributes.first_name} {prospect.attributes.last_name}</li>
            </ul>
        )
    })

    return (
        <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
            {prospects}
        </div>
    )
}

export default RightSide;