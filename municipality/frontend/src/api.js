import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust if using proxy or deployed
});

export default instance;
