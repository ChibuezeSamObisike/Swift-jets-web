import Api from "../utils/api";
import handleApiError from "../utils/handleApiError";


const login = (data) => {
    const response = Api.post('auth/login/', data);
    return response;
};

const forgotPassword = (data) => {
    const response = Api.post('auth/users/reset-password/', data);
    return response;
};

const createPassword = (data) => {
    try {
        const response = Api.post('auth/users/create-password/', data);
        return response;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const verifyToken = (token) => {
    try {
        const response = Api.post('auth/users/verify-token/', { token });
        return response;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const authServices = {
    login,
    forgotPassword,
    createPassword,
    verifyToken
};

export default authServices;