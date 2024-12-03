import axios from "axios";
import { addTokenToHeader, getIdFromToken } from "../helper/utils";

// Register User
export const registerUser = async (data) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/v1/user/register`, data);
    return {
      status: res.status,
      message: res.data.message
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    return {
      status: error.response?.status || 500,
      message: errorMessage
    };
  }
};

// Login User
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/v1/user/login`, data);
    return {
      status: res?.status,
      data: res?.data
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    return {
      status: error.response?.status || 500,
      message: errorMessage
    };
  }
};

// Get User Info
export const getUserInfo = async () => {
  try {
    const id = getIdFromToken();
    const headers = addTokenToHeader({ headers: {} });

    if (headers) {
      const res = await axios.get(`http://localhost:5000/api/v1/user/id/${id}`, { headers });
      return {
        status: res?.status,
        data: res?.data[0]
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    console.log("Error Response:", error.response?.data);
    return {
      status: error.response?.status || 500,
      message: errorMessage
    };
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const headers = addTokenToHeader({ headers: {} });
    
    if (headers) {
      const res = await axios.get(`http://localhost:5000/api/v1/user/all`, { headers });
      return {
        status: res?.status,
        data: res?.data
      };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    console.log("Error Response:", error.response?.data);
    return {
      status: error.response?.status || 500,
      message: errorMessage
    };
  }
};
