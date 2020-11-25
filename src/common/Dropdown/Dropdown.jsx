import React from "react";
import classNames from "classnames";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle";

const useStyles = makeStyles(styles);

function Dropdown(props) {
  const classes = useStyles();

  const {
    label,
    options,
    onChange,
    value,
    error,
    success,
    disabled,
    multiple,
    helperText,
    formControlProps,
    id,
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

  return (
    <FormControl
      error={error}
      {...formControlProps}
      className={`${classes.formControl} ${classes.dropdownFormControl} ${
        formControlProps ? formControlProps.className : ""
      }`}
    >
      <InputLabel
        id="demo-simple-select-label"
        className={classes.labelRoot + labelClasses}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={id}
        value={value}
        onChange={onChange}
        fullWidth
        disabled={disabled}
        multiple={multiple}
        className={`${classes.labelRoot + labelClasses}${
          error ? classes.error : null
        }`}
        input={
          <Input
            classes={{
              underline: underlineClasses,
            }}
          />
        }
      >
        {options &&
          options.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
      {error && helperText && (
        <FormHelperText className={classes.error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  success: PropTypes.bool,
  helperText: PropTypes.string,
  formControlProps: PropTypes.object,
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  multiple: PropTypes.bool,
};

Dropdown.defaultProps = {
  disabled: false,
};

export default Dropdown;
