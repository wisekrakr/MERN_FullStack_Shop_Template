import { v4 as uuidv4 } from "uuid";
import { SET_ERROR, CLEAR_ERROR } from "./types";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ERROR,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: CLEAR_ERROR, payload: id }), timeout);
  };

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
