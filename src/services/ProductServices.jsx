import axios from 'axios';

const REST_API_BASEURL = "http://localhost:8080/product";

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
};

export const listOfProduct = () => {
    return axios.get(REST_API_BASEURL, { headers: getAuthHeader(), withCredentials: true });
};

export const createProduct = (product) => {
    return axios.post(`${REST_API_BASEURL}/save`, product, { headers: getAuthHeader(), withCredentials: true });
};

export const getProduct = (productId) => {
    return axios.get(`${REST_API_BASEURL}/${productId}`, { headers: getAuthHeader(), withCredentials: true });
};

export const UpdateProduct = (productId, product) => {
    return axios.put(`${REST_API_BASEURL}/edit/${productId}`, product, { headers: getAuthHeader(), withCredentials: true });
};

export const deleteProduct = (productId) => {
    return axios.delete(`${REST_API_BASEURL}/delete/${productId}`, { headers: getAuthHeader(), withCredentials: true });
};

