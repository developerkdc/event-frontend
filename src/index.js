import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";
import axios from "axios";
import "./app/config/i18n";

// export const Axios = axios.create({
//   baseURL: process.env.REACT_APP_URL,
// });

// Axios.interceptors.request.use(function (request) {
//   const token = localStorage.getItem("token");

//   if (token) {
//     request.headers.Authorization = token;
//   }

//   return request;
// });

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
