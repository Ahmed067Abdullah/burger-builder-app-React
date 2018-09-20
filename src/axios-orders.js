import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-61e10.firebaseio.com/'
});

export default instance;

