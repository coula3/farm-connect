import React from 'react';
import Loader from '../Loader/Loader';

const FarmerProfile = (props) => {
    const consolidatedConnects = [ ...props.userAttributes.connects, ...props.userAttributes.inverse_connects ];
    const isConnected = consolidatedConnects.find(connect => {
        return connect.id === parseInt(props.farmer.id);
    });

    const isCurrentUser = (farmerId) => {
        return props.userId === farmerId;
    }

    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoadingFarmer ?
                <Loader /> :
                <div>
                    <br />
                    Farmer
                    {!isCurrentUser(props.farmer.id) ?
                        !isConnected ?
                            <div style={{paddingTop:15}}><button style={{backgroundColor:"#3a5f0b", color:"#FFFFFF"}}>Connect</button></div> :
                            <div style={{paddingTop:15}}><button>Unconnect</button></div>
                    :
                        null
                    }

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