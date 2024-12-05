import axios from 'axios';
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    // baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
export default request;
