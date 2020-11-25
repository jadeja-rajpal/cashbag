import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData, getUserPermissions } from "redux/actions/getUserData";
import { getAllStatesCitiesAction } from "redux/actions/frontendUserActions";
import { checkIsToken } from "../api/helperFunction";

function LoginRouteProtector(ComposedComponent) {
  class LoginRequired extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticatedUser: true,
      };
    }

    componentDidMount() {
      this.authenitcateUser();
      if (this.state.authenticatedUser && checkIsToken()) {
        this.props.getUserPermissions();
        this.props.getUserData();
        this.props.getAllStatesCitiesAction();
      }
    }

    authenitcateUser = () => {
      this.setState({
        authenticatedUser: checkIsToken(),
      });
    };

    render() {
      if (this.state.authenticatedUser) {
        return <ComposedComponent {...this.props} />;
      }

      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }
  }

  LoginRequired.propTypes = {
    location: PropTypes.object,
    getUserData: PropTypes.func,
    getUserPermissions: PropTypes.func,
    getAllStatesCitiesAction: PropTypes.func,
  };

  return connect(null, {
    getUserData,
    getUserPermissions,
    getAllStatesCitiesAction,
  })(LoginRequired);
}

export default LoginRouteProtector;
