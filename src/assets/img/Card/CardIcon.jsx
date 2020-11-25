import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreditCard from "@material-ui/icons/CreditCard";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";

const useStyles = makeStyles(styles);

export default function CardIcon(props) {
  const classes = useStyles();
  return (
    <Tooltip id="tooltip-top" title={props.title} placement="top">
      <IconButton
        aria-label="Card"
        className={classes.tableActionButton}
        onClick={props.onClick}
      >
        <CreditCard
          className={`${classes.tableActionButtonIcon} ${classes.icons}`}
        />
      </IconButton>
    </Tooltip>
  );
}

CardIcon.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

CardIcon.defaultProps = {
  title: "Cashbag Card",
  onClick: () => {},
};
