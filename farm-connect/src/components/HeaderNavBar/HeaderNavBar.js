import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import './HeaderNavBar.css';

const HeadNavBar = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const userType = (type) => {
        return type === "Farmer" ? "F" : "P";
    }

    return (
        <div className="HeaderNavBar_main_div">
            {props.userPhoto ?
                <img className="header_img" src={userPhoto(props.userPhoto)} alt="user avatar" /> :
                <img className="header_img" src={avatar} alt="anonymous avatar" />
            }
            <span id="name_span"><Link to={`/users/${props.userId}`} title="View Profile">{props.userAttributes.first_name} {props.userAttributes.last_name}</Link></span>
            <span id="user_type_span"><strong>{userType(props.userAttributes.type)}</strong></span>
            <Link id="padding_signout" to="/signout" onClick={props.userSignOut}>Sign Out</Link>
        </div>
    )
}

export default HeadNavBar;