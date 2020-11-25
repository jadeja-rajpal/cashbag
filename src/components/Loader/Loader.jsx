import React from "react";
import { PropTypes } from "prop-types";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./Loader.style";

export default function Loader(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.loader}>
        <CircularProgress
          color="inherit"
          size={props.size}
          thickness={props.thickness}
        />
      </Backdrop>
    </div>
  );
}

Loader.propTypes = {
  loader: PropTypes.bool.isRequired,
  size: PropTypes.number,
  thickness: PropTypes.number,
};

Loader.defaultProps = {
  size: 100,
  thickness: 3.5,
};
