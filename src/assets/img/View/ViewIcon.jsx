import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Visibility from "@material-ui/icons/Visibility";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function ViewIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip
      id="tooltip-top"
      title={props.title}
      placement="top"
      // classes={{ tooltip: classes.tooltip }}
    >
      <IconButton
        aria-label="Visibility"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <Visibility
          className={`${classes.tableActionButtonIcon} ${classes.icons}`}
        />
      </IconButton>
    </Tooltip>
  );
}

ViewIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

ViewIcon.defaultProps = {
  title: "View Details",
  onClick: () => {},
};
