import axios from "axios";
import authHeader from "./auth-header";

const baseUrl = "http://localhost:4000/api/workers";

const getAllWorkers = () => {
  return axios.get(baseUrl, { headers: authHeader() });
};

const getWorker = (id) => {
  return axios.get(`${baseUrl}/${id}`, { headers: authHeader() });
};

const createWorker = (worker) => {
  return axios.post(baseUrl, { worker, headers: authHeader() });
};

const deleteWorker = (id) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: authHeader() });
};

export { getAllWorkers, getWorker, createWorker, deleteWorker };
