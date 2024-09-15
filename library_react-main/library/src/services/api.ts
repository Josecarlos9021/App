import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL BASE DO BACK END (API REST)
});

export default api;