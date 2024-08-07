import axios from 'axios';
import { getFromLocalStorage } from '../util';

const token = getFromLocalStorage('token')
const api = axios.create({
    baseURL: 'http://localhost:8080', 
    timeout: 1000, 
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    },
});

export const Api = () => {
    return api;
};