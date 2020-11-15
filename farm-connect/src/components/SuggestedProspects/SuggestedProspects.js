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
        const pathArray = props.location.pathname.split("/")
        const pathProspectId = pathArray[pathArray.length - 1]
        if(pathProspectId !== prospect.id){
            props.fetchProspect(prospect.id);
        }
    }

    const prospects = props.prospects.map((prospect) => {
        return (
            <ul id="ul_prospects" key={prospect.id}>
                <li><Link to={`/prospects/${prospect.id}`} onClick={() => handleClick(prospect)}>{image(prospect.attributes.image)}</Link> <Link to={`/prospects/${prospect.id}`} onClick={() => handleClick(prospect)}>{prospect.attributes.first_name} {prospect.attributes.last_name}</Link></li>
            </ul>
        )
    })

    return (
        <div className="SuggestedProspects_main_div">
            { props.isLoadingProspects ?
                <Loader /> :
                <>
                    <h5>Suggested Prospects</h5>
                    {prospects}
                </>
            }
        </div>
    )
}

export default SuggestedProspects;