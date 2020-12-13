import React from 'react';
import { Link } from 'react-router-dom';
import './ConnectRequests.css';

const ConnectRequests = (props) => {
    const totalConnectRequests = props.userConnects.filter(connect => connect[0].status === "pending" && connect[0].user_id !== parseInt(props.userId));
    
    return (
        <div className="ConnectRequests_main_div">
            <div className="connect_requests_card">
                <h3>Connect Requests</h3>
                <ul id="connect_requests_ul">
                    {totalConnectRequests.map(connect => 
                        <li id="connect_li" key={connect[0].id}><Link to={`/${connect[3].toLowerCase() + "s"}/${connect[0].user_id}`}>{connect[1]} {connect[2]}</Link></li>)
                }
                </ul>
            </div>
        </div>
    )
}

export default ConnectRequests;