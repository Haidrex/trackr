import axios from "axios";
import authHeader from "./auth-header";

const baseUrl = "http://localhost:4001/api/records";

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

const exportRecords = async (date) => {
  return await axios.post(
    `${baseUrl}/exportDay`,
    { date },
    {
      headers: authHeader(),
    }
  );
};

const getRecordsByRange = async (id, from, to) => {
  return await axios.get(`${baseUrl}/${id}/${from}/${to}`, {
    headers: authHeader(),
  });
};

const exportByRange = async (id, from, to) => {
  return await axios.post(
    `${baseUrl}/export`,
    { id, from, to },
    {
      headers: authHeader(),
    }
  );
};

export {
  getAllRecords,
  getTodaysRecords,
  getRecordsByDate,
  createRecord,
  exportRecords,
  getRecordsByRange,
  exportByRange,
};
