import axios from 'axios';

const API_URL = 'https://bp2z1wze2j.execute-api.eu-north-1.amazonaws.com/';

export const getMesseges = async () => {
    return await axios.get(`${API_URL}/messages`);
};

export const postMessage = async () => {
    return await axios.post(`${API_URL}/messages`);
}

export const updateMessage = async () => {
    return await axios.put(`${API_URL}/{id}`);
}

export const deleteMessage = async () => {
    return await axios.delete(`${API_URL}/{id}`);
}