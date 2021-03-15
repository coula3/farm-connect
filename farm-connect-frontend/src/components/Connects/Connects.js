import React from 'react';
import { Link } from 'react-router-dom';
import './Connects.css';

const Connects = (props) => {
    const headerStyles = props.match.path === "/my-connects" ? "my-connect-h3 connects-h3" : "connects-h3";
    const myConnects = !props.userConnects ? 0 : props.userConnects.filter(connect => connect[0].status === "accepted");
    const connectRequests = props.userConnects.filter(connect => connect[0].status === "pending" && connect[0].user_id !== parseInt(props.userId));
    const connects = props.match.path === "/my-connects" ? myConnects : connectRequests;
    const headerText = props.match.path === "/my-connects" ? "My Connects" : "Connect Requests";
    const sortedConnects = [...connects].sort((a, b) => {
        if(a[1] < b[1]) { return -1 };
        if(a[1] > b[1]) { return 1 };
        return 0;
    });

    const fetchProfile = (connectId, connectType) => {
        if(connectType === "Farmer"){
            props.fetchFarmer(connectId);
        } else {
            props.fetchProspect(connectId);
        }
    }
    
    const renderRequestsList = (connect) => {
        const connectId = connect[0].user_id === parseInt(props.userId) ? connect[0].connect_id : connect[0].user_id;
        const spanStyle = connect[3] === "Farmer" ? "user-list-type-span farmer-user-list-type-span" : "user-list-type-span";

        return  <li id="connect-list" key={connect[0].id}>
                    <Link to={`/${connect[3].toLowerCase() + "s"}/${connectId}`} onClick={() => fetchProfile(connectId, connect[3])}>
                        {connect[1]} {connect[2]}
                    </Link>

                    <span className={spanStyle}>
                        {connect[3][0]}
                    </span>
                </li>;
    }

    return (
        <div className="ConnectRequests-main-div">
            <div className="connect-requests-card">
                <button id="x-close-btn" onClick={() => props.history.push("/listings")}>X</button>

                <h3 className={headerStyles}>{headerText}</h3>

                <div id="connects-div">
                    <ul id="connect-requests-ul">
                        {   sortedConnects.map(connect =>
                                renderRequestsList(connect))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Connects;