import React from 'react';

const ListingsInterests = (props) => {
    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul style={{listStyle:"none", paddingLeft:"0px"}} key={idx}>
                <li>{listing[0]} - {listing[2]} ({listing[1]})</li>
            </ul>
        )
    })

    return (
        <div>
            <h5>High Interest Listings</h5>
            {listingsInterests}
            <br />
        </div>
    )
}

export default ListingsInterests;