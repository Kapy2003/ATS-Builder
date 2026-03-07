import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const sendContactMessage = async (formData) => {
  const response = await axios.post(
    `${API_URL}/contact`,
    formData
  );

  return response.data;
};