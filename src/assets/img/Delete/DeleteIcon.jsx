import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function DeleteIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip id="tooltip-top" title={props.title} placement="top">
      <IconButton
        aria-label="Delete"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <Delete
          className={`${classes.tableActionButtonIcon} ${classes.close}`}
        />
      </IconButton>
    </Tooltip>
  );
}

DeleteIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

DeleteIcon.defaultProps = {
  title: "Delete",
  onClick: () => {},
};
