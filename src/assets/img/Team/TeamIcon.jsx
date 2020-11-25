import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Group from "@material-ui/icons/Group";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function TeamIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip id="tooltip-top" title={props.title} placement="top">
      <IconButton
        aria-label="Group"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <Group
          className={`${classes.tableActionButtonIcon} ${classes.icons}`}
        />
      </IconButton>
    </Tooltip>
  );
}

TeamIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

TeamIcon.defaultProps = {
  title: "Team Members",
  onClick: () => {},
};
