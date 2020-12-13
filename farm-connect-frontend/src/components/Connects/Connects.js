import React from 'react';
import { Link } from 'react-router-dom';
import './Connects.css';

const Connects = (props) => {
    const myConnects = !props.userConnects ? 0 : props.userConnects.filter(connect => connect[0].status === "accepted");
    const connectRequests = props.userConnects.filter(connect => connect[0].status === "pending" && connect[0].user_id !== parseInt(props.userId));
    const connects = props.match.path === "/my-connects" ? myConnects : connectRequests;
    const headerText = props.match.path === "/my-connects" ? "My Connects" : "Connect Requests";

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
                <h3>{headerText}</h3>
                <ul id="connect_requests_ul">
                    {connects.map(connect => 
                        <li id="connect_li" key={connect[0].id}><Link to={`/${connect[3].toLowerCase() + "s"}/${connect[0].user_id}`} onClick={() => fetchProfile(connect[0].user_id, connect[3])}>{connect[1]} {connect[2]}</Link><span id="user_list_type_span">{connect[3][0]}</span></li>)
                }
                </ul>
            </div>
        </div>
    )
}

export default Connects;