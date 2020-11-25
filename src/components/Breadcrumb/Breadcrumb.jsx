import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import breadcrumbPath from "./Breadcrumb.config";
import "./Breadcrumb.scss";

function Breadcrumb(props) {
  const { match } = props;
  const makeBreadcrumb = (config) => {
    return (
      config &&
      config.map((link) => {
        let linkComponent = null;
        if (config.indexOf(link) !== config.length - 1) {
          linkComponent = (
            <Link key={link.title} to={link.redirect} className={"link"}>
              {link.title}
            </Link>
          );
        } else {
          linkComponent = (
            <Typography key={link.title} color="textPrimary" className="link">
              {link.title}
            </Typography>
          );
        }
        return linkComponent;
      })
    );
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" className={"wrapper"}>
      {makeBreadcrumb(breadcrumbPath[match.path])}
    </Breadcrumbs>
  );
}

Breadcrumb.propTypes = {
  match: PropTypes.object,
};

export default withRouter(Breadcrumb);
