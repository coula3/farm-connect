import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import Loader from '../Loader/Loader';
import { scrollToTopOfPage } from '../../utils/miscellaneousUtils';
import './SuggestedProspects.css';

const SuggestedProspects = (props) => {
    const prospectPhoto = (image) => {
        return `http://localhost:3000/${image}`;
    }

    const getProspectPhoto = (image) => {
        if(image){
            return <img src={prospectPhoto(image)} alt="prospect avatar" className="prospect-image" />
        } else {
            return <img src={avatar} alt="anonymous avatar" className="prospect-image" />
        }
    }

    const handleClick = (prospect) => {
        const pathArray = props.location.pathname.split("/");
        const pathProspectId = pathArray[pathArray.length - 1];

        if(pathProspectId !== prospect.id){
            props.fetchProspect(prospect.id);
        }

        scrollToTopOfPage();
    }

    const prospects = props.prospects.map((prospect) => {
        return (
            <ul id="suggested-prospects-ul" key={prospect.id}>
                <li><span id="suggested-prospects-li-span"><Link to={`/prospects/${prospect.id}`} onClick={() => handleClick(prospect)}>{getProspectPhoto(prospect.attributes.image)}</Link></span> <Link to={`/prospects/${prospect.id}`} onClick={() => handleClick(prospect)}>{prospect.attributes.first_name} {prospect.attributes.last_name}</Link></li>
            </ul>
        )
    })

    return (
        <div className="SuggestedProspects-main-div">
            { props.isLoadingProspects
                ?   <Loader />
                :   <>
                        <h4>Suggested Prospects</h4>
                        {prospects}
                    </>
            }
        </div>
    )
}

export default SuggestedProspects;