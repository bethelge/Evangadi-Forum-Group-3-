import axios from 'axios';

const axiosBase = axios.create({
    baseURL:'http://localhost:5200/api'
})
export default axiosBase;