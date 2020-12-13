import React from 'react';
import { Link } from 'react-router-dom';
import './ConnectRequests.css';

const ConnectRequests = (props) => {
    const totalConnectRequests = props.userConnects.filter(connect => connect[0].status === "pending" && connect[0].user_id !== parseInt(props.userId));

    const fetchProfile = (connectId, connectType) => {
        if(connectType === "Farmer"){
            props.fetchFarmer(connectId);
        } else {
            props.fetchProspect(connectId);
        }
    }
    
    return (
        <div className="ConnectRequests_main_div">
            <div className="connect_requests_card">
                <h3>Connect Requests</h3>
                <ul id="connect_requests_ul">
                    {totalConnectRequests.map(connect => 
                        <li id="connect_li" key={connect[0].id}><Link to={`/${connect[3].toLowerCase() + "s"}/${connect[0].user_id}`} onClick={() => fetchProfile(connect[0].user_id, connect[3])}>{connect[1]} {connect[2]}</Link><span id="user_list_type_span">{connect[3][0]}</span></li>)
                }
                </ul>
            </div>
        </div>
    )
}

export default ConnectRequests;