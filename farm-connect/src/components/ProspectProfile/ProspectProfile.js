import React from 'react';
import Loader from '../Loader/Loader';

const ProspectProfile = (props) => {
    const consolidatedConnects = [ ...props.userAttributes.connects, ...props.userAttributes.inverse_connects ];
    const isConnected = (prospectId) => {
        return consolidatedConnects.find(connect => {
            return connect.id === parseInt(prospectId);
        });
    }

    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoadingProspect ?
                <Loader /> :
                <div>
                    <h3>Prospect</h3>
                    {!isConnected(props.prospect.id) ?
                        <div style={{paddingTop:15}}><button style={{backgroundColor:"#3a5f0b", color:"#FFFFFF"}}>Connect</button></div> :
                        <div style={{paddingTop:15}}><button>Unconnect</button></div>
                    }
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