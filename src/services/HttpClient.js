import axios from "axios";

axios.defaults.baseURL = 'https://localhost:55087/api';
//axios.defaults.baseURL = 'https://backbiossay.appidk.com/api';

const requestGeneric = {
    get: (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    put: (url, body) => axios.put(url, body),
    delete: (url) => axios.delete(url),
};

export default requestGeneric;