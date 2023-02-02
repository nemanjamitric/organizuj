import {environment} from "../enviroments/enviroment";

const {apiUrl}= environment;

export const loginUser = (email, password) => {
    const formData = {email, password};
    return fetch(
        `${apiUrl}/login`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    ).then(x => x);
}

export const registerUser = (formData) => {
    return fetch(
        `${apiUrl}/register`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    ).then(x => x);
}

export const resetPassword = (email) => {
    const formData = {email};
    return fetch(
        `${apiUrl}/forgot-password?patient=true`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    ).then(x => x);
}

export const loginWithGoogle = (email, password) => {
    return fetch(`${apiUrl}/login?patient=true`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, loginWithGoogle: password === undefined ? true : false}),
        }
    ).then(x => x);
}

export const loginWithApple = (email) => {
    return fetch(`${apiUrl}/login?patient=true`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, loginWithApple: true}),
        }
    ).then(x => x);
}

export const loginPatientWithApple = (email) => {
    return fetch(`${apiUrl}/login?patient=true`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, loginWithApple: true}),
        }
    ).then(x => x);
}

export const checkLicenceNumber = (licenceNumber) => {
    return fetch(`${apiUrl}/check-licence/${licenceNumber}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}

export const registerDoctor = (formData) => {
    return fetch(
        `${apiUrl}/register?type=doctor`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    ).then(x => x);
}