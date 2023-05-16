import axios from "axios";

const BASE_URL = '/api/'

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": "application/json",
        "Authorization": "Basic YmFzaWM6NldUeDdsVjNIR1AzNzRna245c2w="
    },
})
