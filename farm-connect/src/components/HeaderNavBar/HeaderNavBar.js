import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';

const HeadNavBar = (props) => {
    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const userType = (type) => {
        return type === "Farmer" ? "F" : "P";
    }

    return (
        <div style={{width:"90%", margin:"0% 5% 1% 5%", paddingRight:"15px", textAlign:"right"}}>
            {props.userPhoto ?
                <img src={userPhoto(props.userPhoto)} alt="user avatar" style={{height:25, width:25, borderRadius:"50%", marginRight:10}} /> :
                <img src={avatar} alt="anonymous avatar" style={{height:25, width:25, borderRadius:"50%", marginRight:10}} />
            }
            <span style={{marginRight: "10px"}}><Link to={`/users/${props.userId}`} title="View Profile">{props.userAttributes.first_name} {props.userAttributes.last_name}</Link></span>
            <span style={{padding:"1px 5px", border:"solid 2px", marginRight:"10px", borderRadius:"50%", color:"#3a5f0b", borderColor:"#3a5f0b"}}><strong>{userType(props.userAttributes.type)}</strong></span>
            <Link to="/signout" onClick={props.userSignOut}>Sign Out</Link>
        </div>
    )
}

export default HeadNavBar;