import React from 'react';

export const setFocusSignIn = () => {
    const emailInput = document.getElementById("signin-email");
    const emailPassword = document.getElementById("signin-password");
    emailInput.focus();
    emailInput.style.cssText = "border-color: red";
    emailPassword.style.cssText = "border-color: red";
}

export const firstNameError = (errorMessages) => {
    const firstName = errorMessages.filter( msg => msg.startsWith("First name"));

    if(firstName.length > 0 && firstName[0].endsWith("blank")){
        return "first name required";
    } else if(firstName.length > 0 && firstName[0].endsWith("space")){
        return "only letters and hyphens";
    } else if(firstName.length > 0 && firstName[0].includes("long")){
        return "maximum of 14 characters";
    }
}

export const lastNameError = (errorMessages) => {
    const lastName = errorMessages.filter(msg => msg.startsWith("Last name"));

    if(lastName.length > 0 && lastName[0].endsWith("blank")){
        return "last name required";
    } else if(lastName.length > 0 && lastName[0].endsWith("space")){
        return "only letters and hyphens";
    } else if(lastName.length > 0 && lastName[0].includes("long")){
        return "maximum of 20 characters";
    }
}

export const dateOfBirthError = (errorMessages) => {
    const dateOfBirth = errorMessages.filter(msg => msg.startsWith("Date"));

    if(dateOfBirth.length > 0 && dateOfBirth[0].endsWith("blank")){
        return "date of birth required";
    } else if(dateOfBirth.length > 0 && dateOfBirth[0].endsWith("least 13 years")){
        return "age must be least 13 years";
    }
}

export const emailError = (errorMessages) => {
    const email = errorMessages.filter(msg => msg.startsWith("Email"));

    if(email.length > 0 && email[0].endsWith("blank")){
        return "email required";
    } else if(email.length > 0 && email[0].endsWith("invalid")){
        return "email is invalid";
    } else if(email.length > 0 && email[0].endsWith("been taken")){
        return "email unavailable";
    }
}

export const passwordError = (errorMessages) => {
    const password = errorMessages.filter(msg => msg.startsWith("Password"));

    if(password.length > 0 && password[0].endsWith("blank")){
        return "password required";
    } else if(password.length > 0 && password[0].includes("short")){
        return "minimum of 3 characters";
    } else if(password.length > 0 && password[0].includes("long")){
        return "maximum of 15 characters";
    }
}

export const typeError = (errorMessages) => {
    const type = errorMessages.filter(msg => msg.startsWith("Type"));

    if(type.length > 0){
        return <span style={{marginTop:"0px", fontSize:12, color:"red"}}>selection of farmer or prospect required</span>;
    }
}