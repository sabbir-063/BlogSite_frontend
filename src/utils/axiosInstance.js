import axios from "axios";

const instance = axios.create({
    baseURL: "https://blogsite-backend-4fmp.onrender.com/api",
});

// Add request interceptor to add token to headers
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(config);
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
