import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate } from '../../utils/miscellaneousUtils';
import './ProspectProfile.css';

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
        <div className="ProspectProfile_main_div">
            { props.isLoadingProspect ?
                <Loader /> :
                <div className="prospect_profile_card">
                    <h3>Prospect Profile</h3>
                    <div id="img_div">
                        {props.prospect.attributes.image ?
                            <img className="img" src={prospectPhoto(props.prospect.attributes.image)} alt="user avatar" /> :
                            <img className="img" src={avatar} alt="anonymous avatar" />
                        }
                    </div>
                    <p><label><strong>ID:</strong> </label>{props.prospect.id}</p>
                    <p><label><strong>Name:</strong> </label>{props.prospect.attributes.first_name} {props.prospect.attributes.last_name}</p>
                    <p><label><strong>Email:</strong> </label>{props.prospect.attributes.email}</p>
                    <br />
                    <p><label><strong>Joined:</strong> </label>{getDate(props.prospect.attributes.created_at)}</p>
                    {!isCurrentUser(props.prospect.id) ?
                        !isConnected(props.prospect.id) ?
                            <div className="connect_btn_div"><button id="connect_btn" className="global_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Connect</button></div> :
                            <div className="connect_btn_div"><button id="unconnect_btn" className="global_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Unconnect</button></div>
                    :
                        null
                    }
                </div>
            }
        </div>
    )
}

export default ProspectProfile;