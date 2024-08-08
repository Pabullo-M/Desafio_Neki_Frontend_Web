import axios from 'axios';
import { getFromLocalStorage } from '../util';


const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json'
    },
});

export const Api = () => {
    return api;
};