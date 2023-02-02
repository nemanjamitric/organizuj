import {environment} from "../enviroments/enviroment";

const {apiUrl}= environment;

export const getEvents = () => {
    return fetch(`${apiUrl}/event/get`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}