import React from 'react';
import Loader from '../Loader/Loader';

const ProspectProfile = (props) => {
    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoadingProspect ?
                <Loader /> :
                <div>
                    Prospect
                    <p><label>Prospect ID: </label>{props.prospect.id}</p>
                    <p><label>Name: </label>{props.prospect.attributes.first_name} {props.prospect.attributes.last_name}</p>
                    <p><label>eMail: </label>{props.prospect.attributes.email}</p>
                    <br />
                    <p><label>Joined: </label>{props.prospect.attributes.created_at.slice(0, 10)}</p>
                </div>
            }
        </div>
    )
}

export default ProspectProfile;