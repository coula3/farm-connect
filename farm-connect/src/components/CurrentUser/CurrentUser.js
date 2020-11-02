import React from 'react';
import Loader from '../Loader/Loader';
import avatar from '../../assets/avatar.png';

const CurrentUser = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
     }

    return (
        <div style={{width: "60%", display: "inline", float: "left"}}>
            { props.isLoading ?
                <Loader /> :
            <div>
                <div style={{margin:"auto", height:180, width:150}}>
                    {props.userPhoto ?
                        <img src={userPhoto(props.userPhoto)} alt="user avatar" style={{width:"100%", height:"100%"}} /> :
                        <img src={avatar} alt="anonymous avatar" style={{width:"100%", height:"100%"}} />
                    }
                </div>
                <p><label>ID: </label>{props.userId}</p>
                <p><label>Date of Birth: </label>{props.userAttributes.date_of_birth.slice(0, 10)}</p>
                <p><label>eMail: </label>{props.userAttributes.email}</p>
                <br />
                <p><label>Joined: </label>{props.userAttributes.created_at.slice(0, 10)}</p>
            </div>
            }
        </div>
    )
}

export default CurrentUser;