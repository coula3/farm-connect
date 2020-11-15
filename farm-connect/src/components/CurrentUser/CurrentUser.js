import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate } from '../../utils/miscellaneousUtils';
import './CurrentUser.css';

const CurrentUser = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const handleClick = () => {
        props.history.push(`/users/${props.userId}/edit`);
    }

    return (
        <div className="CurrentUser_main_div">
            { props.isLoading ?
                <Loader /> :
            <div>
                <h3>My Profile</h3>
                <div id="img_div">
                    {props.userPhoto ?
                        <img className="current_user_img" src={userPhoto(props.userPhoto)} alt="user avatar" /> :
                        <img className="current_user_img" src={avatar} alt="anonymous avatar" />
                    }
                </div>
                <p><label>ID: </label>{props.userId}</p>
                <p><label>Name: </label>{props.userAttributes.first_name} {props.userAttributes.last_name}</p>
                <p><label>Date of Birth: </label>{getDate(props.userAttributes.date_of_birth)}</p>
                <p><label>eMail: </label>{props.userAttributes.email}</p>
                <br />
                <p><label>Joined: </label>{getDate(props.userAttributes.created_at)}</p>
                <div id="edit_btn_div"><button onClick={handleClick}>Edit Profile</button></div>
            </div>
            }
        </div>
    )
}

export default CurrentUser;