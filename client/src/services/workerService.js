import axios from "axios";
import authHeader from "./auth-header";

const baseUrl = "http://localhost:4001/api/workers";

const getAllWorkers = async () => {
  return await axios.get(baseUrl, { headers: authHeader() });
};

const getWorker = async (id) => {
  return await axios.get(`${baseUrl}/${id}`, { headers: authHeader() });
};

const createWorker = async (worker) => {
  return await axios.post(baseUrl, worker, { headers: authHeader() });
};

const deleteWorker = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, { headers: authHeader() });
};

export { getAllWorkers, getWorker, createWorker, deleteWorker };
