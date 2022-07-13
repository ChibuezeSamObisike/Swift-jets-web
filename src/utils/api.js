import axios from 'axios';
import Auth from './Auth';

export const base_url = process.env.REACT_APP_API_BASE_URL;

const Api = axios.create({
    baseURL: base_url
});

Api.interceptors.request.use(
    (config) => {
        // This adds an authorization key to config object if a token exists.
        if (Auth.isAuthenticated()) {
            config.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default Api;