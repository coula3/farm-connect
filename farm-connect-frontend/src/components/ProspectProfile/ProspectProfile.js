import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getFullName, getDate } from '../../utils/miscellaneousUtils';
import './ProspectProfile.css';

const ProspectProfile = (props) => {
    let usersConnected, pendingAcceptance;

    const isCurrentUser = (prospectId) => {
        return props.userId === prospectId;
    }

    if(!props.userConnects){
        usersConnected = false;
    } else {
        props.userConnects.find(connect => {
            return usersConnected = (connect[0].connect_id === parseInt(props.prospect.id) || connect[0].user_id === parseInt(props.prospect.id)) && connect[0].status;
        });
    }

    if(props.userConnects){
        props.userConnects.find(connect => {
            return pendingAcceptance = (connect[0].connect_id === parseInt(props.prospect.id) || connect[0].user_id === parseInt(props.prospect.id)) && connect[0].status === "pending";
        });
    }

    const connectionByUser = !props.userConnects ? false : props.userConnects.find(connect => {
        return connect[0].user_id === parseInt(props.userId) && connect[0].connect_id === parseInt(props.prospect.id);
    });

    const prospectPhoto = (prospectPhoto) => {
        return `http://localhost:3000/${prospectPhoto}`;
    }

    const connectUnconnectUsers = (e, userId, prospectId) => {
        if(e.target.innerText === "Request Connect"){
            props.requestConnect(userId, prospectId);
        } else if(e.target.innerText === "Accept"){
            props.acceptConnect(userId, prospectId);
        } else {
            props.unConnectUsers(userId, prospectId);
        }
    }

    return (
        <div className="ProspectProfile_main_div">
            { props.isLoadingProspect
                ?   <Loader />
                :   <div className="prospect_profile_card">
                        <h3>Prospect Profile</h3>

                        <div id="img_div">
                            { props.prospect.attributes.image
                                ?   <img className="prospect_img" src={prospectPhoto(props.prospect.attributes.image)} alt="user avatar" />
                                :   <img className="prospect_img" src={avatar} alt="anonymous avatar" />
                            }
                        </div>

                        <p><label><strong>UID:</strong> </label>{props.prospect.id}</p>
                        <p><label><strong>Name:</strong> </label>{getFullName(props.prospect.attributes.first_name, props.prospect.attributes.last_name)}</p>
                        <p><label><strong>Email:</strong> </label>{props.prospect.attributes.email.toLowerCase()}</p>
                        <br />
                        <p className="join_date_p"><label><strong>Joined:</strong> </label>{getDate(props.prospect.attributes.created_at)}</p>

                        { !isCurrentUser(props.prospect.id)
                            ?   !usersConnected
                                ?   <button className="global_btn request_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Request Connect</button>
                                    :    pendingAcceptance && !connectionByUser
                                        ?   <>
                                                <button className="global_btn accept_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Accept</button>
                                                <button className="global_btn decline_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Decline</button>
                                            </>
                                                :   pendingAcceptance && connectionByUser
                                                    ?   <button className="global_btn cancel_request_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Cancel Request</button>
                                                        :   <div className="connect_btn_div"><button className="unconnect_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.prospect.id)}>Unconnect</button></div>
                            :   null
                        }
                    </div>
            }
        </div>
    )
}

export default ProspectProfile;