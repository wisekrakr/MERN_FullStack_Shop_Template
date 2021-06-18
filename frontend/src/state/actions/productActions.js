import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  LOADING_PRODUCTS,
  PRODUCTS_ERROR,
  LOADING_PRODUCT,
  PRODUCT_ERROR,
  CLEAR_ERROR,
} from "./types";

// Get all Products
export const getProducts =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    setProductsLoading();
    try {
      let params = {
        keyword: keyword,
        page: currentPage,
        "price[lte]": price[1],
        "price[gte]": price[0],
        "rating[gte]": rating,
      };

      if (category) {
        params.category = category;
      }

      const { data } = await axios.get("/api/v1/products", {
        params: params,
      });

      dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: err.message,
      });
    }
  };

// Get product by id
export const getProductById = (id) => async (dispatch) => {
  setProductLoading();
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
// Set Product Loading
export const setProductLoading = async () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCT });
};
