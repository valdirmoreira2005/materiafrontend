import axios from 'axios';

const api = axios.create({
    baseURL: 'https://materiabackend.herokuapp.com/materia'
});

export default api; 