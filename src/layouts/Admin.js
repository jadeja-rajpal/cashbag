import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle";
import { connect } from "react-redux";
import { removeToken } from "api/helperFunction";
import routes from "../Routes/routesConfig";

let ps;

const useStyles = makeStyles(styles);

function Admin({ ...rest }) {
  const [permissions, setPermissions] = React.useState([]);
  const classes = useStyles();

  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        // TODO permission handling
        // show all if permission array includes '1' i.e Admin
        if (
          permissions.includes(1) ||
          prop.showPrivilege ||
          permissions.includes(JSON.stringify(prop.privilegeId))
        ) {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.path}
                exact={true}
                component={prop.component}
                key={key}
              />
            );
          }
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        }
        return false;
      })}
      <Redirect to="/dashboard" />;
    </Switch>
  );

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  React.useEffect(() => {
    if (rest.userStateReducer.isSuccess) {
      setPermissions(rest.userStateReducer.user.privilegesFromToken);
    } else if (rest.userStateReducer.isError) {
      removeToken();
    }
  }, [rest.userStateReducer]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Cashbag"}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { userStateReducer: state.authentication.userState };
};

export default connect(mapStateToProps, {})(Admin);
