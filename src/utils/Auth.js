import jwt_decode from 'jwt-decode';

const setToken = (token) => {
    localStorage.setItem('token', token);
};

const getToken = () => {
    return localStorage.getItem('token');
};

const getDecodedJwt = () => {
    try {
        const token = getToken();
        return jwt_decode(token);
    } catch (e) {
        return {};
    }
};

const removeToken = () => {
    localStorage.removeItem('token');
};

const logOut = () => {
    removeToken();
    window.location.replace('/');
};

const isAuthenticated = () => {
    try {
        const decodedToken = getDecodedJwt();

        const { exp } = decodedToken;
        const currentTime = Date.now() / 1000;

        return exp > currentTime;
    } catch (e) {
        return false;
    }
};

// This might not be useful if the user role is not encoded with the jwt_token
const isAdmin = () => {
    try {
        const decodedToken = getDecodedJwt();
        const { role } = decodedToken;
        return role === 'Admin';
    } catch (error) {
        return false;
    }
};

const Auth = {
    isAuthenticated,
    getDecodedJwt,
    setToken,
    getToken,
    removeToken,
    logOut,
    isAdmin
};

export default Auth;