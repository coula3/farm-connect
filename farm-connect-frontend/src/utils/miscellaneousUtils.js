const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDate = (sourceDate) => {
    const dateObject = new Date(sourceDate);
    return `${months[dateObject.getUTCMonth()].slice(0, 3)} ${sourceDate.slice(8, 10)}, ${sourceDate.slice(0, 4)}`;
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