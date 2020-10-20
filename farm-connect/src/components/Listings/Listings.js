import React from 'react';

const Listings = (props) => {
    const listings = props.listings.map(listing => {
        const listDate = listing.attributes.list_date.slice(0, 10);
        const fullName = listing.attributes.user.first_name + " " + listing.attributes.user.last_name;
        const availabilityDate = listing.attributes.est_availability.slice(0, 10);
        const commodity = listing.attributes.commodity.name
        let available;
        listing.attributes.available ? available = "Yes" : available = "No";

        return (
            <div key={listing.id}>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>List Date</th>
                            <th>Commodity</th>
                            <th>Est Availability</th>
                            <th>Farmer</th>
                            <th>Available</th>
                            <th>Interests</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{listDate}</td>
                            <td>{commodity}</td>
                            <td>{availabilityDate}</td>
                            <td>{fullName}</td>
                            <td>{available}</td>
                            <td>{listing.attributes.interests.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    })

    return (
        <div>
            {listings}
        </div>
    )
}

export default Listings;