import React, { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle";
import { connect } from "react-redux";
import { removeToken } from "api/helperFunction";
import { logoImage3 } from "../../assets/img/index";
import { themeColor, themeBgColor } from "../../libs/constants";

const useStyles = makeStyles(styles);

function Sidebar(props) {
  const classes = useStyles();
  const [permissions, setPermissions] = React.useState([]);

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1;
  }

  useEffect(() => {
    if (props.userStateReducer.isSuccess) {
      setPermissions(props.userStateReducer.user.privilegesFromToken);
    } else if (props.userStateReducer.isError) {
      removeToken();
    }
  }, [props.userStateReducer]);

  // eslint-disable-next-line no-unused-vars
  const { logoText, routes } = props;
  const linksSection = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        // show all if permission array includes '1' i.e Admin
        if (
          prop.layout === "/admin" &&
          (permissions.includes(1) ||
            prop.showPrivilege ||
            permissions.includes(JSON.stringify(prop.privilegeId)))
        ) {
          let listItemClasses = "";
          listItemClasses = classNames({
            [` ${classes[themeColor]}`]: activeRoute(prop.path),
          });
          const whiteFontClasses = classNames({
            [` ${classes.whiteFont}`]: activeRoute(prop.path),
          });

          return (
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        }
        return null;
      })}
    </List>
  );
  const logoSection = (
    <div className={classes.logo}>
      <a
        // href='https://www.creative-tim.com?ref=mdr-sidebar'//TODO: CashBag Logo
        // className={classNames(classes.logoLink, {
        //   [classes.logoLinkRTL]: props.rtlActive
        // })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logoImage3} alt="logo" className={classes.img} />
        </div>
        {/* {logoText} */}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        {/* Mobile View */}
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {logoSection}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {linksSection}
          </div>
          <div
            className={classes.background}
            style={{ background: themeBgColor }}
          />
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        {/* Web View */}
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {logoSection}
          <div className={classes.sidebarWrapper}>{linksSection}</div>
          <div
            className={classes.background}
            style={{ background: themeBgColor }}
          />
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
  userStateReducer: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { userStateReducer: state.authentication.userState };
};

export default connect(mapStateToProps, {})(Sidebar);
