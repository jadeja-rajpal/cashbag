import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function EditIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip id="tooltip-top" title={props.title} placement="top">
      <IconButton
        aria-label="Edit"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <Edit className={`${classes.tableActionButtonIcon} ${classes.icons}`} />
      </IconButton>
    </Tooltip>
  );
}

EditIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

EditIcon.defaultProps = {
  title: "Edit Task",
  onClick: () => {},
};
