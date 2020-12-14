import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate, getFullName } from '../../utils/miscellaneousUtils';
import './CurrentUser.css';

const CurrentUser = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const handleClick = () => {
        props.history.push(`/users/${props.userId}/edit`);
    }

    const mainDivStyle = props.userAttributes.type === "Farmer" ? "CurrentFarmerUser_main_div" : "CurrentProspectUser_main_div";

    return (
        <div className={mainDivStyle}>
            { props.isLoading
                ?   <Loader />
                :   <div className="current_user_profile_card">
                        <h3>My Profile</h3>

                        <div id="img_div">
                            { props.userPhoto
                                ?   <img className="current_user_img" src={userPhoto(props.userPhoto)} alt="user avatar" />
                                :   <img className="current_user_img" src={avatar} alt="anonymous avatar" />
                            }
                        </div>

                        <p><label><strong>UID:</strong> </label>{props.userId}</p>
                        <p><label><strong>Name:</strong> </label>{getFullName(props.userAttributes.first_name, props.userAttributes.last_name)}</p>
                        <p><label><strong>Date of Birth:</strong> </label>{getDate(props.userAttributes.date_of_birth)}</p>
                        <p><label><strong>Email:</strong> </label>{props.userAttributes.email.toLowerCase()}</p>
                        <br />
                        <p><label><strong>Joined:</strong> </label>{getDate(props.userAttributes.created_at)}</p>

                        <div>
                            <button id="cu_edit_btn" className="global_btn" onClick={handleClick}>Edit</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CurrentUser;