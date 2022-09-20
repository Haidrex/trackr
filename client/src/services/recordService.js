import axios from "axios";
import authHeader from "./auth-header";

const baseUrl = "http://localhost:4000/api/records";

const getAllRecords = async () => {
  return await axios.get(baseUrl, { headers: authHeader() });
};

const getTodaysRecords = async () => {
  return await axios.get(`${baseUrl}/today`, { headers: authHeader() });
};

const getRecordsByDate = async (date) => {
  return await axios.get(`${baseUrl}/${date}`, { headers: authHeader() });
};

const createRecord = async (record) => {
  return await axios.post(baseUrl, record, { headers: authHeader() });
};

export { getAllRecords, getTodaysRecords, getRecordsByDate, createRecord };
