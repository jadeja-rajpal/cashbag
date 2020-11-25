import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { InputLabel } from "@material-ui/core";
import classNames from "classnames";
import stylesGlobal from "assets/jss/material-dashboard-react/components/customInputStyle";

const useStylesGlobal = makeStyles(stylesGlobal);

export default function CheckboxLabels(props) {
  const classesGlobbal = useStylesGlobal();

  const labelClasses = classNames({
    [` ${classesGlobbal.labelRootError}`]: props.error,
    [` ${classesGlobbal.labelRootSuccess}`]: props.success && !props.error,
  });
  return (
    <>
      <InputLabel
        className={classesGlobbal.labelRoot + labelClasses}
        htmlFor={props.labelText}
      >
        {props.labelText}
      </InputLabel>
      <FormGroup id={props.labelText}>
        {props.checkBoxItem &&
          props.checkBoxItem.map((item, index) => {
            const ischecked =
              props.checkArray &&
              props.checkArray.find((value) => value === item.value);
            return (
              <FormControlLabel
                key={`${index}+${item.label}`}
                control={
                  <Checkbox
                    checked={Boolean(ischecked)}
                    onChange={props.handleChange}
                    name={item.name}
                    value={item.value}
                    color="default"
                  />
                }
                label={item.label}
              />
            );
          })}
      </FormGroup>
    </>
  );
}

CheckboxLabels.propTypes = {
  labelText: PropTypes.string,
  checkArray: PropTypes.array,
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  checkBoxItem: PropTypes.array,
  error: PropTypes.string,
  success: PropTypes.string,
};
