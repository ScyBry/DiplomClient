import axios from 'axios';

export const axiosBase = axios.create({
  baseURL: 'http://localhost:7777/api/',
});
