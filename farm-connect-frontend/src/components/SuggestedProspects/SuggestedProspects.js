import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import Loader from '../Loader/Loader';
import './SuggestedProspects.css';

const SuggestedProspects = (props) => {
    const prospectPhoto = (image) => {
        return `http://localhost:3000/${image}`;
    }

    const image = (image) => {
        if(image){
            return <img src={prospectPhoto(image)} alt="prospect avatar" style={{height:25, width:25, borderRadius:"50%", marginRight:5}} />
        } else {
            return <img src={avatar} alt="anonymous avatar" style={{height:25, width:25, borderRadius:"50%", marginRight:5}} />
        }
    }

    const handleClick = (prospect) => {
        const pathArray = props.location.pathname.split("/");
        const pathProspectId = pathArray[pathArray.length - 1];
        if(pathProspectId !== prospect.id){
            props.fetchProspect(prospect.id);
        }
    }

    const prospects = props.prospects.map((prospect) => {
        return (
            <ul id="sp_ul" key={prospect.id}>
                <li><span id="sp_li_span"><Link to={`/prospects/${prospect.id}`} onClick={() => handleClick(prospect)}>{image(prospect.attributes.image)}</Link></span> <Link to={`/prospects/${prospect.id}`} onClick={() => handleClick(prospect)}>{prospect.attributes.first_name} {prospect.attributes.last_name}</Link></li>
            </ul>
        )
    })

    return (
        <div className="SuggestedProspects_main_div">
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