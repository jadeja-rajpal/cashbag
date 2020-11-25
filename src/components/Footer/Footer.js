import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { footer as constants } from "libs/constants";
import styles from "assets/jss/material-dashboard-react/components/footerStyle";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <Typography>
          {constants.COPYRIGHT}
          <span className={classes.cashbag}>{constants.CASHBAG}</span>
          {constants.RIGHTS}
        </Typography>
      </div>
    </footer>
  );
}
