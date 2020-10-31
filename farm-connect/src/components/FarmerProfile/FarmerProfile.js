import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';

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
                    <div>
                        {props.farmerPhoto ?
                            <img src={farmerPhoto(props.farmerPhoto)} alt="user avatar" style={{height:350, width:300}} /> :
                            <img src={avatar} alt="anonymous avatar" style={{height:100, width:100}} />
                        }
                    </div>
                    <p><label>Farmer ID: </label>{props.farmer.id}</p>
                    <p><label>Name: </label>{props.farmer.attributes.first_name} {props.farmer.attributes.last_name}</p>
                    <p><label>eMail: </label>{props.farmer.attributes.email}</p>
                    <br />
                    <p><label>Joined: </label>{props.farmer.attributes.created_at.slice(0, 10)}</p>
                </div>
            }
        </div>
    )
}

export default FarmerProfile;