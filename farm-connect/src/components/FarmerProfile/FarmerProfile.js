import React from 'react';
import Loader from '../Loader/Loader';

const FarmerProfile = (props) => {
    const isConnected = props.userAttributes.connects.find(connect => {
        return connect.id === parseInt(props.farmer.id);
    })

    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoadingFarmer ?
                <Loader /> :
                <div>
                    <br />
                    Farmer
                    { !isConnected ?
                        <div style={{paddingTop:15}}><button>Connect</button></div> :
                        <div style={{paddingTop:15}}><button>Unconnect</button></div>
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