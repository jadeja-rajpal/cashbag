import React from "react";
import { Redirect } from "react-router-dom";
import { checkIsToken } from "../api/helperFunction";

function LogoutRouteProtector(ComposedComponent) {
  class LogoutRequired extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticatedUser: false,
      };
    }

    componentDidMount() {
      this.authenitcateUser();
    }

    authenitcateUser = () => {
      this.setState({
        authenticatedUser: checkIsToken(),
      });
    };

    render() {
      if (this.state.authenticatedUser) {
        return (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  LogoutRequired.propTypes = {};

  return LogoutRequired;
}

export default LogoutRouteProtector;
