import axios from "axios";

const baseUrl = "http://localhost:4000/api/auth";

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, { username, password });

  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export { login, logout, getCurrentUser };
