import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '../../components/Backdrop/Backdrop';
import Sidedrawer from '../../components/SideDrawer/SideDrawer';
import { getFullName, paths } from '../../utils/miscellaneousUtils';
import avatar from '../../assets/avatar.png';
import './HeaderNavBar.css';

const HeadNavBar = (props) => {
    const [show, setShow] = useState(false);

    const userPhoto = (userPhoto) => {
        return `http://localhost:3000/${userPhoto}`;
    }

    const userType = (type) => {
        return type === "Farmer" ? "F" : "P";
    }

    return (
        <>
            <Sidedrawer show={show} closeBackdrop={() => setShow(false)} />
            <Backdrop show={show} closeBackdrop={() => setShow(false)} />

            <div className="HeaderNavBar-main-div">
                <div id="burger-menu-div" onClick={() => setShow(true)}>
                    <div className="burger-menus"></div>
                    <div className="burger-menus"></div>
                    <div className="burger-menus"></div>
                </div>

                <div id="nav-user-profile">
                    { props.userPhoto
                        ?   <Link to={`/users/${props.userId}`} title="View Profile">
                                <span className="header-img-span">
                                    <img className="header-img" src={userPhoto(props.userPhoto)} alt="user avatar" />
                                </span>
                            </Link>
                        :   <span className="header-img-span">
                                <img className="header-img" src={avatar} alt="anonymous avatar" />
                            </span>
                    }

                    <Link id="hnb-name-link" to={`/users/${props.userId}`} title="View Profile">
                        {getFullName(props.userAttributes.first_name, props.userAttributes.last_name)}
                    </Link>

                    <span id="user-type-global-span">
                        <span id="user-type-span">
                            <strong>{userType(props.userAttributes.type)}</strong>
                        </span>
                    </span>

                    <Link id="signout-link" to={paths().SIGNOUT_PATH} onClick={props.userSignOut}>
                        Sign Out
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HeadNavBar;