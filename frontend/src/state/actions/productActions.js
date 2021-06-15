import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  LOADING_PRODUCTS,
  PRODUCT_ERROR,
  CLEAR_ERROR,
} from "./types";

// Get all Products
export const getProducts = () => async (dispatch) => {
  setProductsLoading();
  try {
    const { data } = await axios.get("/api/v1/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.message,
    });
  }
};

// Get product by id
export const getProductById = (id) => async (dispatch) => {
  setProductsLoading();
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.message,
    });
  }
};

// Set Products Loading
export const setProductsLoading = async () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
};
