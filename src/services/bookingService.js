import Api from "utils/api";
import handleApiError from "utils/handleApiError";

const requestNewQuotation = async (params) => {
    try {
        const { data } = await Api.post('quotes/', params);
        return data;
    } catch (e) {
        throw new Error(handleApiError(e));
    }
};

const getQuotes = async ({ queryKey }) => {
    try {
        const [, params] = queryKey;
        return await Api.get('quotes/', {params});
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const getQuoteById = async ({ queryKey }) => {
    try {
        const [, params] = queryKey;
        return await Api.get(`quotes/${params.id}`);
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const addFlightSuggestions = async (data) => {
    try {
        const { id, payload } = data;
        const { data } = await Api.post(`quotes/${id}/create_flight_suggestion/`, payload);
        return data;
    } catch (e) {
        throw new Error(handleApiError(e));
    }
};

const editQuote = async (data) => {
    const { id, payload } = data;
    try {
        const response = await Api.patch(`quotes/${id}/`, payload);
        return response;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const bookingService = {
    requestNewQuotation,
    getQuotes,
    getQuoteById,
    editQuote,
    addFlightSuggestions
}

export default bookingService;