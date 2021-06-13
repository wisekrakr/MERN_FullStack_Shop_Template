import axios from "axios";

import {
  GET_PRODUCTS,
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
      payload: err,
    });
  }
};

// Clear errors
export const clearErrors = async () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

// Set Products Loading
export const setProductsLoading = async () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
};
