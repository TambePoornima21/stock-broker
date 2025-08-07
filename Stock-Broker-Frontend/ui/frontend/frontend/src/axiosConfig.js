// axiosConfig.js
import axios from 'axios';

const token = localStorage.getItem('bb8cf840-7e34-4f08-a34a-65efa4ee9e4c'); //Token

axios.defaults.baseURL = 'http://localhost:8084/api';
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
axios.defaults.headers.post['Content-Type'] = 'application/json';
