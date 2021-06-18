import { combineReducers } from "redux";
import { productsReducer, productReducer } from "./productsReducer";
import categoriesReducer from "./categoriesReducer";

export default combineReducers({
  products: productsReducer,
  product: productReducer,
  categories: categoriesReducer,
});
