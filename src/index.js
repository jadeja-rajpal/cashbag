/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ErrorBoundary from "components/ErrorBoundary";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "assets/css/material-dashboard-react.css";
import initStore from "redux/store";
import App from "App";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={initStore}>
      <Router history={hist}>
        <ReactNotification />
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
