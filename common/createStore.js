import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../src/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = applyMiddleware(thunk);

module.exports = initialState =>
  createStore(rootReducer, initialState, composeWithDevTools(middleware));
