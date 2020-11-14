import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate } from '../../utils/miscellaneousUtils';

const ProspectProfile = (props) => {
    const consolidatedConnects = [ ...props.userAttributes.connects, ...props.userAttributes.inverse_connects ];
    const isConnected = (prospectId) => {
        return consolidatedConnects.find(connect => {
            return connect.id === parseInt(prospectId);
        });
    }

    const prospectPhoto = (prospectPhoto) => {
        return `http://localhost:3000/${prospectPhoto}`;
    }

    const isCurrentUser = (prospectId) => {
        return props.userId === prospectId;
    }

    const connectUnconnectUsers = (e, userId, prospectId) => {
        if(e.target.innerText === "Connect"){
            props.connectUsers(userId, prospectId);
        } else {
            props.unConnectUsers(userId, prospectId);
        }
    }

    return (
        <div style={{width: "65%", display: "inline", float: "left"}}>
            { props.isLoadingProspect ?
                <Loader /> :
                <div>
                    <h3>Prospect</h3>
                    <div style={{margin:"auto", height:180, width:150}}>
                        {props.prospect.attributes.image ?
                            <img src={prospectPhoto(props.prospect.attributes.image)} alt="user avatar" style={{width:"100%", height:"100%"}} /> :
                            <img src={avatar} alt="anonymous avatar" style={{width:"100%", height:"100%"}} />
                        }
                    </div>
                    <p><label>Prospect ID: </label>{props.prospect.id}</p>
                    <p><label>Name: </label>{props.prospect.attributes.first_name} {props.prospect.attributes.last_name}</p>
                    <p><label>eMail: </label>{props.prospect.attributes.email}</p>
                    <br />
                    <p><label>Joined: </label>{getDate(props.prospect.attributes.created_at)}</p>
                    {!isCurrentUser(props.prospect.id) ?
                        !isConnected(props.prospect.id) ?
                            <div style={{paddingTop:15}}><button style={{backgroundColor:"#3a5f0b", color:"#FFFFFF"}} onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Connect</button></div> :
                            <div style={{paddingTop:15}} onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}><button>Unconnect</button></div>
                    :
                        null
                    }
                </div>
            }
        </div>
    )
}

export default ProspectProfile;