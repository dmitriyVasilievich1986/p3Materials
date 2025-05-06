import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import * as React from "react";
import App from "./App";
import "./style.scss";

ReactDOM.createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
