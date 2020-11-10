export const commodityError = (errorMessages) => {
    const commodity = errorMessages.filter( msg => msg.startsWith("Commodity"));
    if(commodity.length > 0){
        return "commodity required";
    }
};

export const availabilityError = (errorMessages) => {
    const availability = errorMessages.filter( msg => msg.startsWith("Availability"));
    if(availability.length > 0 && availability[0].endsWith("blank")){
        return "availability required";
    } else if(availability.length > 0 && availability[0].endsWith("past")){
        return "availability cannot be in the past";
    }
};

export const measureError = (errorMessages) => {
    const measure = errorMessages.filter( msg => msg.startsWith("Measure"));
    if(measure.length > 0){
        return "measure required";
    }
};