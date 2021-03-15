import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate, getFullName } from '../../utils/miscellaneousUtils';
import './CurrentUser.css';

const CurrentUser = (props) => {
    const getUserPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const redirectOnInvalidUserId = () => {
        const userPath = props.location.pathname.split("/")
        const extractedUserId = !isNaN(parseInt(userPath[userPath.length -1])) && parseInt(userPath[userPath.length -1])
        const isIdDifferent = extractedUserId !== parseInt(props.userId)

        if(isNaN(parseInt(userPath[userPath.length -1]))) {
            props.addErrorMessages("Invalid Entry")
        } else if(isIdDifferent) {
            props.addErrorMessages("Unauthorized Access Denied")
        }
    }

    const handleClick = () => {
        props.history.push(`/users/${props.userId}/edit`);
    }

    const mainDivStyle = props.userAttributes.type === "Farmer" ? "Farmer-profile-styles" : "Prospect-profile-styles";

    return (
        <div className={mainDivStyle}>
            { props.isLoading
                ?   <Loader />
                :   <div className="Current-user-profile-card">
                        {redirectOnInvalidUserId()}

                        <button id="x-close-btn" onClick={() => props.history.push("/listings")}>X</button>

                        <h3>My Profile</h3>

                        <div className="img-div">
                            { props.userPhoto
                                ?   <img className="current-user-img" src={getUserPhoto(props.userPhoto)} alt="user avatar" />
                                :   <img className="current-user-img" src={avatar} alt="anonymous avatar" />
                            }
                        </div>

                        <p><label><strong>UID:</strong> </label>{props.userId}</p>
                        <p><label><strong>Name:</strong> </label>{getFullName(props.userAttributes.first_name, props.userAttributes.last_name)}</p>
                        <p><label><strong>Date of Birth:</strong> </label>{getDate(props.userAttributes.date_of_birth)}</p>
                        <p><label><strong>Email:</strong> </label>{props.userAttributes.email.toLowerCase()}</p>
                        <p id="user-joined-p"><label><strong>Joined:</strong> </label>{getDate(props.userAttributes.created_at)}</p>

                        <div>
                            <button id="cu-edit-btn" className="global-btn" onClick={handleClick}>Edit</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CurrentUser;