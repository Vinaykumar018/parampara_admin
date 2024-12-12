import axios from "axios";

// const apiUrl = "https://parampara-admin.vercel.app/api/slider";
// const apiUrl = "http://localhost:3005/api/slider";
const apiUrl = `${import.meta.env.VITE_BASE_URL}/slider`;

const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`;

const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};

// Slider API
export const getAllSliders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/all-slider`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error;
  }
};

export const createSlider = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/create-slider`, formData, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating slider:", error);
    throw error;
  }
};

// Category API
export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/all-category`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const deleteSlider = async (id) => {
  try {
    
    
    const response = await axios.delete(`${apiUrl}/delete/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting slider:", error);
    throw error;
  }
};

export const deleteSliderCategory = async (id) => {
  try {
    
    
    const response = await axios.delete(`${apiUrl}/category/delete/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting slider:", error);
    throw error;
  }
};



export const UpdateSliderCategory = async (id, updatedData) => {
  console.log(id,updatedData)
  try {
    const response = await axios.put(`${BASE_URL}/slider/category/update-category/${id}`, updatedData, {
      headers: {
        Authorization: AUTH_TOKEN,
       
      },
    });
    return response.data; // Return the response data for further use
  } catch (error) {
    console.error('Error updating Pooja:', error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};