import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';
import { getDate } from '../../utils/miscellaneousUtils';

const CurrentUser = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const handleClick = () => {
        props.history.push(`/users/${props.userId}/edit`);
    }

    return (
        <div style={{width: "65%", display: "inline", float: "left"}}>
            { props.isLoading ?
                <Loader /> :
            <div>
                <h3>My Profile</h3>
                <div style={{margin:"auto", height:180, width:150}}>
                    {props.userPhoto ?
                        <img src={userPhoto(props.userPhoto)} alt="user avatar" style={{width:"100%", height:"100%"}} /> :
                        <img src={avatar} alt="anonymous avatar" style={{width:"100%", height:"100%"}} />
                    }
                </div>
                <p><label>ID: </label>{props.userId}</p>
                <p><label>Name: </label>{props.userAttributes.first_name} {props.userAttributes.last_name}</p>
                <p><label>Date of Birth: </label>{getDate(props.userAttributes.date_of_birth)}</p>
                <p><label>eMail: </label>{props.userAttributes.email}</p>
                <br />
                <p><label>Joined: </label>{getDate(props.userAttributes.created_at)}</p>
                <div style={{marginTop:"30px"}}><button onClick={handleClick}>Edit Profile</button></div>
            </div>
            }
        </div>
    )
}

export default CurrentUser;