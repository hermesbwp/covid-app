import axios from 'axios';

const myAxios = axios.create({
    baseURL: 'http://localhost:3333/api'
})

export default myAxios;