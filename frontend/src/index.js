import "./style.scss";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
