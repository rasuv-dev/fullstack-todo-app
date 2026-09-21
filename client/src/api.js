const API_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};

export default API_URL;