import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/workers';

const getAllWorkers = () => {
    return axios.get(baseUrl);
}

const getWorker = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const createWorker = (worker) => {
    return axios.post(baseUrl, worker)
}

const deleteWorker = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}



export { getAllWorkers, getWorker, createWorker, deleteWorker }