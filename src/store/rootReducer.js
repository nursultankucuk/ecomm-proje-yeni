import { combineReducers } from "redux";
import productReducer from "./productReducer";

const testReducer = (state = { message: "Redux çalışıyor" }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  test: testReducer,
  products: productReducer,
});
