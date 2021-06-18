import axios from "axios";

import {
  GET_CATEGORIES,
  GET_CATEGORY_BY_ID,
  CATEGORY_ERROR,
  CLEAR_ERROR,
} from "./types";

// Get all Categories
export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/categories");

    dispatch({
      type: GET_CATEGORIES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.message,
    });
  }
};

// Get category by id
export const getCategoryById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/category/${id}`);

    dispatch({
      type: GET_CATEGORY_BY_ID,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.message,
    });
  }
};
