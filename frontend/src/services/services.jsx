import axios from 'axios';

const API_URL = 'https://bp2z1wze2j.execute-api.eu-north-1.amazonaws.com';

export const getMessages = async () => {
    return await axios.get(`${API_URL}/messages`);
};

export const postMessage = async (message) => {
    return await axios.post(`${API_URL}/messages`, message, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const updateMessage = async (id, updatedMessage) => {
    return await axios.put(`${API_URL}/messages/${id}`, updatedMessage, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const deleteMessage = async (id) => {
    return await axios.delete(`${API_URL}/messages/${id}`);
};

export const getMessagesByUser = async (username) => {
    return await axios.get(`${API_URL}/messages/user/${username}`);
};
