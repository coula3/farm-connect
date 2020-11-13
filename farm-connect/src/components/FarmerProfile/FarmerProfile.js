import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate } from '../../assets/miscellaneous';

const FarmerProfile = (props) => {
    const consolidatedConnects = [ ...props.userAttributes.connects, ...props.userAttributes.inverse_connects ];
    const isConnected = consolidatedConnects.find(connect => {
        return connect.id === parseInt(props.farmer.id);
    });

    const farmerPhoto = (farmerPhoto) => {
       return `http://localhost:3000/${farmerPhoto}`;
    }

    const isCurrentUser = (farmerId) => {
        return props.userId === farmerId;
    }

    const connectUnconnectUsers = (e, userId, farmerId) => {
        if(e.target.innerText === "Connect"){
            props.connectUsers(userId, farmerId);
        } else {
            props.unConnectUsers(userId, farmerId);
        }
    }

    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoadingFarmer ?
                <Loader /> :
                <div>
                    <h3>Farmer</h3>
                    {!isCurrentUser(props.farmer.id) ?
                        !isConnected ?
                            <div style={{paddingTop:15}}><button style={{backgroundColor:"#3a5f0b", color:"#FFFFFF"}} onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Connect</button></div> :
                            <div style={{paddingTop:15}}><button onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Unconnect</button></div>
                    :
                        null
                    }
                    <br />
                    <div style={{margin:"auto", height:180, width:150}}>
                        {props.farmerPhoto ?
                            <img src={farmerPhoto(props.farmerPhoto)} alt="user avatar" style={{width:"100%", height:"100%"}} /> :
                            <img src={avatar} alt="anonymous avatar" style={{width:"100%", height:"100%"}} />
                        }
                    </div>
                    <p style={{marginTop:"15px"}}><label>Farmer ID: </label>{props.farmer.id}</p>
                    <p><label>Name: </label>{props.farmer.attributes.first_name} {props.farmer.attributes.last_name}</p>
                    <p><label>eMail: </label>{props.farmer.attributes.email}</p>
                    <p><Link to={`/farmers/${props.farmer.id}/listings`}>Listings</Link></p>
                    <br />
                    <p><label>Joined: </label>{getDate(props.farmer.attributes.created_at)}</p>
                </div>
            }
        </div>
    )
}

export default FarmerProfile;