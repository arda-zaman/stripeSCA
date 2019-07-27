import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "../common/routes";
import { Provider } from "react-redux";

import "./assets/css/main.css";

const initialState = {};

const createStore = require("../common/createStore");

const store = createStore(initialState);
const state = store.getState();

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
