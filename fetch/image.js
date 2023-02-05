import {getJWT} from "../hooks/getJWT";
import {environment} from "../enviroments/enviroment";

const {apiUrl}= environment;

export const createEventImage = async (pic, eventId) => {
    const formData = new FormData();
    const imageData = {
        uri: pic.uri, // file uri/path
        name: pic.fileName, //file name
        type: 'image/jpeg', //file type
    }
    formData.append("image_upload", imageData);
    return fetch(`${apiUrl}/image/event/${eventId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getJWT()}`,
            },
            body: formData,
        }
    ).then(x => x);
}

export const uploadProfilePicture = async (pic, userId) => {
    const formData = new FormData();
    return fetch(
        `${apiUrl}/images/users/${id}`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
            body: formData,
        }
    ).then(x => x);
}