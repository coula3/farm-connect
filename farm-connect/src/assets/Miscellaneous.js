const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDate = (sourceDate) => {
    const date = new Date(sourceDate);
    return `${months[date.getMonth()].slice(0, 3)} ${sourceDate.slice(8, 10)}, ${sourceDate.slice(0, 4)}`;
}

export const padListingId = (listingId) => {
    if(listingId < 10){
        return "00" + listingId;
    } else if (listingId > 9 && listingId < 100){
        return "0" + listingId;
    } else {
        return listingId;
    }
}