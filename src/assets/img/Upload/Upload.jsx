import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Backup from "@material-ui/icons/Backup";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function UploadIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip id="tooltip-top" title={props.title} placement="top">
      <IconButton
        aria-label="Upload"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <Backup
          className={`${classes.tableActionButtonIcon} ${classes.icons} ${props.class}`}
        />
      </IconButton>
    </Tooltip>
  );
}

UploadIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  class: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

UploadIcon.defaultProps = {
  title: "Upload File",
  onClick: () => {},
  class: {},
};
