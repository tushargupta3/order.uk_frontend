/* eslint-disable no-unused-vars */
import axios from "axios";

import { addTokenToHeader, getIdFromToken } from "../helper/utils";

export const getCartById = async () => {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`http://localhost:5000/api/v1/cart/id/`, {headers});
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

export const addItemsToCart = async (data) => {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(`http://localhost:5000/api/v1/cart/add`, data, { headers });
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

export const deleteItemFromCart = async (id) => {
  try {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.delete(`http://localhost:5000/api/v1/cart/delete/`, { headers});
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

export const shareCartData = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/cart/public/${id}`);
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