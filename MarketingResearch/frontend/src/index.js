import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import { Provider } from "react-redux";
import { store } from "./reducers/rootReducer";
import { BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  setIsAuthCompany,
  setIsAuthUser,
  setLogout,
} from "./reducers/authReducer";

let token = localStorage.getItem("token");
if (token != null) {
  try {
    let decoded = jwtDecode(token);
    let roles = decoded.roles.map((item) => item["name"]);

    if (roles.includes("ROLE_USER")) store.dispatch(setIsAuthUser(token));
    else if (roles.includes("ROLE_COMPANY"))
      store.dispatch(setIsAuthCompany(token));
  } catch (error) {
    store.dispatch(setLogout);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
