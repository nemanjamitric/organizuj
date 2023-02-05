import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const getAllCities = () => {
    return fetch(`${apiUrl}/city/get`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}