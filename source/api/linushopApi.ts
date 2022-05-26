import axios from 'axios';

const linushopApi = axios.create({
  baseURL: '/api'
});

export default linushopApi;