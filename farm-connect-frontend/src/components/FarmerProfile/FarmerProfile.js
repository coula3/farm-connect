import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate, getFullName } from '../../utils/miscellaneousUtils';
import './FarmerProfile.css';

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

    const displayMyOrName = (farmerId) => {
        let listingPluralized;
        props.farmer.attributes.listings.length > 1 ? listingPluralized = "Listings" : listingPluralized = "Listing";
        return isCurrentUser(farmerId) ? `My ${listingPluralized}` : `${props.farmer.attributes.first_name}'s ${listingPluralized}`;
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

                        <p id="id_p"><label><strong>ID:</strong> </label>{props.farmer.id}</p>
                        <p><label><strong>Name:</strong> </label>{getFullName(props.farmer.attributes.first_name, props.farmer.attributes.last_name)}</p>
                        <p><label><strong>Email:</strong> </label>{props.farmer.attributes.email}</p>
                        <br />
                        <p><label><strong>Joined:</strong> </label>{getDate(props.farmer.attributes.created_at)}</p>

                        { !isCurrentUser(props.farmer.id)
                            ?   !isConnected
                                ?   <div className="connect_btn_div"><button id="connect_btn" className="global_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Connect</button></div>
                                :   <div className="connect_btn_div"><button id="unconnect_btn" onClick={(e) => connectUnconnectUsers(e, props.userId, props.farmer.id)}>Unconnect</button></div>

                            :   null
                        }
                        <div id="listing_btn_div"><button id="listing_btn" className="global_btn" onClick={handleViewListings}>{displayMyOrName(props.farmer.id)}</button></div>
                    </div>
            }
        </div>
    )
}

export default FarmerProfile;