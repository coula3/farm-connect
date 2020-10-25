import React from 'react';
import Loader from '../Loader/Loader';

const FarmerProfile = (props) => {
    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoadingFarmer ?
                <Loader /> :
                <div>
                    Farmer
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