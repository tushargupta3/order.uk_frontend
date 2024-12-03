import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { addTokenToHeader, getIdFromToken } from "../helper/utils";

export const getFoodById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/foodItems/${id}`);
    return {
      status: res?.status,
      data: res?.data
    };
  } catch (error) {
    return {
      status: error?.status ? error.status : 500,
      message: error?.response?.data?.message ? error.response.data.message : "Something went wrong"
    };
  }
};

export const getAllFood = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/fooditems/`);
    return {
      status: res?.status,
      data: res?.data
    };
  } catch (error) {
    return {
      status: error?.status ? error.status : 500,
      message: error?.response?.data?.message ? error.response.data.message : "Something went wrong"
    };
  }
};

export const searchFoodItems = async (query) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/v1/fooditems/search/items`,
      {
        params: { query },
      }
    );

    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};