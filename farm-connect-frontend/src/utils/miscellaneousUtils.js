const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDate = (sourceDate) => {
    const dateObject = new Date(sourceDate);
    return `${months[dateObject.getUTCMonth()].slice(0, 3)} ${sourceDate.slice(8, 10)}, ${sourceDate.slice(0, 4)}`;
}

export const getDateTime = (sourceDate) => {
    const dateString = new Date(sourceDate).toString();
    return `${dateString.slice(4, 8)} ${dateString.slice(8, 10)}, ${dateString.slice(11, 16)}  ${dateString.slice(16, 25)}`;
}

export const padIds = (id) => {
    if(id < 10){
        return "00" + id;
    } else if (id > 9 && id < 100){
        return "0" + id;
    } else {
        return id;
    }
}

export const oneDay = (1000 * 60 * 60 * 24);

export const paths = () => {
    return {
        NEW_LISTING_PATH: "/listings/new",
        LISTINGS_PATH: "/listings",
        OTHER_FARMERS_LISTINGS_PATH: "/listings/other-farmers",
        USER_LISTINGS_PATH: "/users/:id/listings",
        USER_CLOSED_LISTINGS_PATH: "/users/:id/closed-listings",
        MY_INTERESTS_PATH: "/listings/my-interests",
        SIGNOUT_PATH: "/signout"
    }
}

export const getFullName = (firstName, lastName) => {
    const givenName = firstName[0].toUpperCase().concat(firstName.toLowerCase().slice(1));
    const familyName = lastName[0].toUpperCase().concat(lastName.toLowerCase().slice(1));

    return givenName + " " + familyName;
}

export const getInitialAndLastName = (firstName, lastName) => {
    const initial = firstName[0].toUpperCase();
    const familyName = lastName[0].toUpperCase().concat(lastName.toLowerCase().slice(1));

    return initial + ". " + familyName;
}