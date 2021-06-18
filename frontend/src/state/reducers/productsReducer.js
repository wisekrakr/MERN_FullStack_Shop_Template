import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_KEYWORD,
  GET_PRODUCTS_USER,
  POST_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_ERROR,
  LOADING_PRODUCTS,
  PRODUCT_ERROR,
  LOADING_PRODUCT,
  CLEAR_ERROR,
} from "../actions/types";

export const productsReducer = (
  state = {
    products: [],
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalProductCount: action.payload.totalProductCount,
        itemsPerPage: action.payload.itemsPerPage,
        filteredProductCount: action.payload.filteredProductCount,
        loading: false,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case LOADING_PRODUCTS:
      return { ...state, loading: true };
    case PRODUCTS_ERROR:
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

export const productReducer = (
  state = {
    product: {},
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case LOADING_PRODUCT:
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
