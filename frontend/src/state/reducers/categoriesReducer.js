import {
  GET_CATEGORIES,
  GET_CATEGORY_BY_ID,
  CATEGORY_ERROR,
  CLEAR_ERROR,
} from "../actions/types";

const initialState = {
  categories: [],
  category: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        categoryCount: action.payload.categoryCount,
      };
    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        category: action.payload,
        categories: [],
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload,
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
