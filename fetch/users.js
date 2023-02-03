import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const getUserById = async (id) => {
    return fetch(`${apiUrl}/user/get/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
        }
    ).then(x => x);
}