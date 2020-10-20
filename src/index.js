import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import "./App.css";
import "normalize.css/normalize.css";  // https://create-react-app.dev/docs/adding-css-reset/
//import "./styles/styles.scss";   // will use later
import "react-toastify/dist/ReactToastify.css";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
//import { css, withStyles, withStylesPropTypes } from 'react-with-styles';


//console.log(process.env);  // show all enviroment variable both default and custom one
console.log("Application Name:", process.env.REACT_APP_NAME);
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
