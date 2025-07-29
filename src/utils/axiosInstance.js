import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    // },
    // withCredentials: true, // Include credentials for cross-origin requests
    // timeout: 10000, // Set a timeout for requests
    // responseType: "json", // Expect JSON responses
    // validateStatus: (status) => {
    //     // Accept all status codes
    //     return status >= 200 && status < 600;
    // },
    // maxRedirects: 5, // Allow up to 5 redirects
    // paramsSerializer: (params) => {
    //     // Serialize query parameters
    //     return new URLSearchParams(params).toString();
    // },

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
