import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle";

const useStyles = makeStyles(styles);

export default function CustomDateTimePicker(props) {
  const classes = useStyles();
  const {
    labelText,
    helperText,
    id,
    format,
    type,
    handleDateChange,
    error,
    success,
    value,
  } = props;

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  return (
    <>
      <TextField
        InputLabelProps={{
          shrink: true,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
          className: classes.labelRoot + labelClasses,
        }}
        id={id}
        fullWidth
        label={labelText}
        format={format}
        type={type}
        onChange={(e) => handleDateChange(e, id)}
        helperText={helperText}
        value={value}
      />
    </>
  );
}

CustomDateTimePicker.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  success: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.string,
  format: PropTypes.string,
  handleDateChange: PropTypes.func,
  value: PropTypes.string,
};
