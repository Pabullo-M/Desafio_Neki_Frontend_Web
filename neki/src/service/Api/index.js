import axios from 'axios';


const api = axios.create({
    baseURL: 'https://0593-2804-18e4-1-556-4de-5f4d-117a-2cb.ngrok-free.app/', 
    timeout: 1000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const Api = () => {
    return api;
};