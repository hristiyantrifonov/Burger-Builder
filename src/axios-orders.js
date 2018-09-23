import axios from 'axios';

const intance = axios.create({
    baseURL: 'https://myburger-221a9.firebaseio.com/'
});

export default intance;