import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate, getFullName } from '../../utils/miscellaneousUtils';
import './FarmerProfile.css';

const FarmerProfile = (props) => {
    let usersConnected, pendingAcceptance;

    const connectionByUser = !props.userConnects ? false : props.userConnects.find(connect => {
        return connect[0].user_id === parseInt(props.userId) && connect[0].connect_id === parseInt(props.farmer.id);
    });

    if(!props.userConnects){
        usersConnected = false;
    } else {
        props.userConnects.find(connect => {
            return usersConnected = (connect[0].connect_id === parseInt(props.farmer.id) || connect[0].user_id === parseInt(props.farmer.id)) && connect[0].status;
        });
    }

    if(props.userConnects){
        props.userConnects.find(connect => {
            return pendingAcceptance = (connect[0].connect_id === parseInt(props.farmer.id) || connect[0].user_id === parseInt(props.farmer.id)) && connect[0].status === "pending";
        });
    }

    const farmerPhoto = (farmerPhoto) => {
       return `http://localhost:3000/${farmerPhoto}`;
    }

    const isCurrentUser = (farmerId) => {
        return props.userId === farmerId;
    }

    const displayMyOrName = (farmerId) => {
        let listingPluralized;
        props.farmer.attributes.listings.length > 1 ? listingPluralized = "Listings" : listingPluralized = "Listing";
        return isCurrentUser(farmerId) ? `My ${listingPluralized}` : `${listingPluralized}`;
    }

    const connectUnconnectUsers = (e, userId, farmerId) => {
        if(e.target.innerText === "Request Connect"){
            props.requestConnect(userId, farmerId);
        } else if(e.target.innerText === "Accept"){
            props.acceptConnect(userId, farmerId);
            console.log("Accept")
        } else {
            props.unConnectUsers(userId, farmerId);
        }
    }

    const handleViewListings = () => {
        props.history.push(`/farmers/${props.farmer.id}/listings`);
    }

    return (
        <div className="FarmerProfile_main_div">
            { props.isLoadingFarmer
                ?   <Loader />
                :   <div className="farmer_profile_card">
                        <h3>Farmer Profile</h3>

                        <div id="img_div">
                            { props.farmerPhoto
                                ?   <img src={farmerPhoto(props.farmerPhoto)} alt="user avatar" className="farmer_img" />
                                :   <img src={avatar} alt="anonymous avatar" className="farmer_img" />
                            }
                        </div>

                        <p id="id_p"><label><strong>UID:</strong> </label>{props.farmer.id}</p>
                        <p><label><strong>Name:</strong> </label>{getFullName(props.farmer.attributes.first_name, props.farmer.attributes.last_name)}</p>
                        <p><label><strong>Email:</strong> </label>{props.farmer.attributes.email.toLowerCase()}</p>
                        <br />
                        <p style={{marginBottom:"50px"}}><label><strong>Joined:</strong> </label>{getDate(props.farmer.attributes.created_at)}</p>

                        { !isCurrentUser(props.farmer.id)
                            ?   !usersConnected
                                ?   <button className="global_btn request_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Request Connect</button>
                                    :   pendingAcceptance && !connectionByUser
                                        ?   <>
                                                <button className="global_btn accept_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Accept</button>
                                                <button className="global_btn decline_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Decline</button>
                                            </>
                                            : pendingAcceptance && connectionByUser
                                                ?   <button className="global_btn cancel_request_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Cancel Request</button>

                                                :   <div className="connect_btn_div"><button className="unconnect_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Unconnect</button></div>
                            :   null
                        }
                        <div id="listing_btn_div"><button id="listings_btn" className="global_btn" onClick={handleViewListings}>{displayMyOrName(props.farmer.id)}</button></div>
                    </div>
            }
        </div>
    )
}

export default FarmerProfile;