import Api from "utils/api";
import handleApiError from "utils/handleApiError";

const addNewJet = async (params) => {
    try {
        const { data } = await Api.post('flights/', params);
        return data;
    } catch (e) {
        throw new Error(handleApiError(e));
    }
};

const getJets = async ({ queryKey }) => {
    try {
        const [, params] = queryKey;
        return await Api.get('flights/', {params});
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const getJetById = async ({ queryKey }) => {
    try {
        const [, params] = queryKey;
        return await Api.get(`flights/${params.id}`);
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const getJetSuggestionByQuoteId = async ({ queryKey }) => {
    try {
        const [, params] = queryKey;
        return await Api.get(`flights/quotes/${params.quote_id}/suggestions`);
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const editJet = async (data) => {
    const { id, payload } = data;
    try {
        const response = await Api.patch(`flights/${id}/`, payload);
        return response;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

const jetService = {
    addNewJet,
    getJets,
    getJetById,
    editJet,
    getJetSuggestionByQuoteId
}

export default jetService;