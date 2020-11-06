import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import Loader from '../Loader/Loader';

const Prospects = (props) => {
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

    const prospects = props.prospects.map((prospect) => {
        return (
            <ul style={{listStyle:"none", paddingLeft:0}} key={prospect.id}>
                <li>{image(prospect.attributes.image)} <Link to={`/prospects/${prospect.id}`} onClick={()=>props.fetchProspect(prospect.id)}>{prospect.attributes.first_name} {prospect.attributes.last_name}</Link></li>
            </ul>
        )
    })

    return (
        <div style={{width: "15%", display: "inline"}}>
            { props.isLoadingProspects ?
                <Loader /> :
                prospects
            }
        </div>
    )
}

export default Prospects;