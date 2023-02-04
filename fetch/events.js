import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const getEvents = () => {
    return fetch(`${apiUrl}/event/get`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}

export const getEventById = async (id) => {
    return fetch(`${apiUrl}/event/get/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
        }
    ).then(x => x);
}

export const createEvent = async (data) => {
    console.log("SENDING", data);
    return fetch(`${apiUrl}/event/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
            body: JSON.stringify(data)
        }
    ).then(x => x);
}