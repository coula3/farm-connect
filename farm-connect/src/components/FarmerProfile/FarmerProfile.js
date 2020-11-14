import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate } from '../../utils/miscellaneousUtils';

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

    const handleViewListings = () => {
        props.history.push(`/farmers/${props.farmer.id}/listings`);
    }

    return (
        <div style={{width: "65%", display: "inline", float: "left"}}>
            { props.isLoadingFarmer ?
                <Loader /> :
                <div>
                    <h3>Farmer</h3>
                    <div style={{margin:"auto", height:180, width:150}}>
                        {props.farmerPhoto ?
                            <img src={farmerPhoto(props.farmerPhoto)} alt="user avatar" style={{width:"100%", height:"100%"}} /> :
                            <img src={avatar} alt="anonymous avatar" style={{width:"100%", height:"100%"}} />
                        }
                    </div>
                    <p style={{marginTop:"15px"}}><label>Farmer ID: </label>{props.farmer.id}</p>
                    <p><label>Name: </label>{props.farmer.attributes.first_name} {props.farmer.attributes.last_name}</p>
                    <p><label>eMail: </label>{props.farmer.attributes.email}</p>
                    <br />
                    <p><label>Joined: </label>{getDate(props.farmer.attributes.created_at)}</p>
                    {!isCurrentUser(props.farmer.id) ?
                        !isConnected ?
                            <div style={{paddingTop:15}}><button style={{backgroundColor:"#3a5f0b", color:"#FFF"}} onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Connect</button></div> :
                            <div style={{paddingTop:15}}><button onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Unconnect</button></div>
                    :
                        null
                    }
                    <div style={{marginTop:10}}><button style={{backgroundColor:"#3a5f0b", color:"#FFF"}} onClick={handleViewListings}>View Listings</button></div>
                </div>
            }
        </div>
    )
}

export default FarmerProfile;