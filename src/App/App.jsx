import React from "react";
import "babel-polyfill";
import { Route, Switch } from "react-router-dom";
import Login from "../layouts/Login";
import ForgotPassword from "../layouts/ForgotPassword";
import Admin from "../layouts/Admin";
import LoginRouteProtector from "../Routes/LoginRouteProtector";
import LogoutRouteProtector from "../Routes/LogoutRouteProtector";
import endPoints from "../Routes/endpoints";
import ResetPassword from "../views/ResetPassword";

function App() {
  return (
    <div>
      <Switch>
        <Route path={endPoints.login} component={LogoutRouteProtector(Login)} />
        <Route
          path={endPoints.forgotPassword}
          component={LogoutRouteProtector(ForgotPassword)}
        />
        <Route
          path={endPoints.resetPassword}
          component={LogoutRouteProtector(ResetPassword)}
        />
        <Route
          path={endPoints.default}
          component={LoginRouteProtector(Admin)}
        />
      </Switch>
    </div>
  );
}

App.propTypes = {};

export default App;
