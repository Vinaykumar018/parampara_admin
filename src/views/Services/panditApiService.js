const BASE_URL=`${import.meta.env.VITE_BASE_URL}`;
import axios from "axios";

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

 export const fetchPanditDetails = async () => {
  

  try {
    
    console.log( `${BASE_URL}/pandit/all-pandit`)
    const response = await axios.get(
      `${BASE_URL}/pandit/all-pandit`,{
      headers: {
        Authorization: AUTH_TOKEN,
      }
    }
    );
    return response.data; // Return only the data object
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const deletePandit = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/pandit/delete/${id}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Pooja:', error);
    throw error;
  }
};




///SEEE


export const updatePanditDetails = async (formData, image, aadharImage) => {
  console.log(`${BASE_URL}/pandit/update-pandit`);

  try {
    // Prepare the headers with Authorization token
  

    // Prepare formData
    const data = new FormData();
    // Append each key-value pair from formData
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    // Append image and aadhar_image if available
    if (image) data.append("image", image);
    if (aadharImage) data.append("aadhar_image", aadharImage);
    

    // Make the API request to update pandit details
    const response = await axios.post(
     `${BASE_URL}/pandit/update-pandit`, data,
     {
      headers: {
        Authorization: AUTH_TOKEN,
      }
    }
    );

    return response.data; // Return the response data from the API
  } catch (error) {
    // Handle error and throw it for the calling component to handle
    throw error;
  }
};





