import React from 'react';
import { Link } from 'react-router-dom';

const ResourcesBoard = (props) => {
    const prospects = props.prospects.map((prospect) => {
        return (
            <ul style={{listStyle:"none", paddingLeft:0}} key={prospect.id}>
                <li>{prospect.id} - <Link to={`/prospects/${prospect.id}`} onClick={()=>props.fetchProspect(prospect.id)}>{prospect.attributes.first_name} {prospect.attributes.last_name}</Link></li>
            </ul>
        )
    })

    return (
        <div style={{width: "15%", display: "inline", float: "left", border: "solid 1px"}}>
            {prospects}
        </div>
    )
}

export default ResourcesBoard;