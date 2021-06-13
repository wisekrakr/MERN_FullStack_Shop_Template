import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_KEYWORD,
  GET_PRODUCTS_USER,
  GET_PRODUCT,
  POST_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  LOADING_PRODUCTS,
  CLEAR_ERROR,
} from "../actions/types";

const initialState = {
  products: [],
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalProductCount: action.payload.totalProductCount,
        loading: false,
      };

    case LOADING_PRODUCTS:
      return { ...state, loading: true };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
