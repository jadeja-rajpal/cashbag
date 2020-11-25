import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import "./header.scss";
// core components
import styles from "assets/jss/material-dashboard-react/components/headerStyle";
import AdminNavbarLinks from "./AdminNavbarLinks";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const { color, routes } = props;
  const appBarClasses = classNames({
    [` ${classes[color]}`]: color,
  });
  const makeHeading = (adminRoutes) => {
    let name = "";
    adminRoutes.map((route) => {
      if (window.location.href.indexOf(route.headerRoute) !== -1 && !name) {
        name = route.name;
      }
      return null;
    });
    return name;
  };
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Typography className={"header-title"}>
            {makeHeading(routes)}
          </Typography>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
