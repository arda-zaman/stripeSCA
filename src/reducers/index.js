import { combineReducers } from "redux";
import productReducer from "./productReducer";
import stripeReducer from "./stripeReducer";

export default combineReducers({
  products: productReducer,
  stripe: stripeReducer
});