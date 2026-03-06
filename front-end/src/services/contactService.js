import axios from "axios";

export const sendContactMessage = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/contact",
    formData
  );

  return response.data;
};