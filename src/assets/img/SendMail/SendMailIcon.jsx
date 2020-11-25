import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Send from "@material-ui/icons/Send";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function SendMailIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip id="tooltip-top" title={props.title} placement="top">
      <IconButton
        aria-label="Send"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <Send className={`${classes.tableActionButtonIcon} ${classes.icons}`} />
      </IconButton>
    </Tooltip>
  );
}

SendMailIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

SendMailIcon.defaultProps = {
  title: "Send Mail",
  onClick: () => {},
};
