import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:31963/api/public/",
});