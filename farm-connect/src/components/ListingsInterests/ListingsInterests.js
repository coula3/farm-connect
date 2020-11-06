import React from 'react';

const ListingsInterests = (props) => {
    const listingsInterests = props.listingsInterests.map((listing, idx) => {
        return (
            <ul key={idx}>
                <li>{listing[0]} - {listing[2]} ({listing[1]})</li>
            </ul>
        )
    })

    return (
        <div>
            {listingsInterests}
        </div>
    )
}

export default ListingsInterests;