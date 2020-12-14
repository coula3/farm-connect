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
    
    const renderRequestsList = (connect) => {
        const connectId = connect[0].user_id === parseInt(props.userId) ? connect[0].connect_id : connect[0].user_id;

        return <li id="connect_li" key={connect[0].id}><Link to={`/${connect[3].toLowerCase() + "s"}/${connectId}`} onClick={() => fetchProfile(connectId, connect[3])}>{connect[1]} {connect[2]}</Link><span id="user_list_type_span">{connect[3][0]}</span></li>;
    }

    return (
        <div className="ConnectRequests_main_div">
            <div className="connect_requests_card">
                <h3>{headerText}</h3>
                <ul id="connect_requests_ul">
                    {connects.map(connect => 
                        renderRequestsList(connect))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Connects;