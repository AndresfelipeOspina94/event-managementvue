import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base de la api de Laravel
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;