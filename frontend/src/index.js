import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import * as React from "react";
import App from "./App";
import "./style.scss";

import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
