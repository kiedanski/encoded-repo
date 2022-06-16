import axios from "axios";
import React from 'react';

const useApi = (apiFunc, procData = (x) => x) => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const request = async (...args) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            let processedData = procData(result.data);
            setData(processedData);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        request
    };
};


const apiClient = axios.create({
    baseURL: "https://api.carbonintensity.org.uk",
    headers: {
        'Accept': 'application/json',
    }
});


const getIntensity = (from, to) => apiClient.get("/intensity/" + from + "/" + to);

const getGenerationMix = (region) => apiClient.get("/regional/regionid/" + region);

export default {
    useApi,
    getIntensity,
    getGenerationMix
}


