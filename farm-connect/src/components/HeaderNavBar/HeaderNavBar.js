import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';

const HeadNavBar = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    return (
        <div style={{marginBottom:"15px"}}>
            {props.userPhoto ?
                <img src={userPhoto(props.userPhoto)} alt="user avatar" style={{height:25, width:25, borderRadius:"50%", marginRight:10}} /> :
                <img src={avatar} alt="anonymous avatar" style={{height:25, width:25, borderRadius:"50%", marginRight:10}} />
            }
            <span style={{marginRight: "15px"}}>{props.userAttributes.first_name} {props.userAttributes.last_name}</span>
            <Link to="/signout" onClick={props.userSignOut}>Sign Out</Link>
        </div>
    )
}

export default HeadNavBar;