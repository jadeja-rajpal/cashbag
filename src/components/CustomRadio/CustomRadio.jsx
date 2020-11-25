import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import "./CustomRadio.scss";

function CustomRadio(props) {
  const {
    horizontal,
    name,
    ariaLabel,
    value,
    onChange,
    optionList,
    label,
  } = props;
  return (
    <FormControl component="fieldset" className={"custom-radio-wrapper"}>
      <FormLabel component="legend" color="warning" className="radio-label">
        {label}
      </FormLabel>
      <RadioGroup
        aria-label={ariaLabel}
        name={name}
        row={horizontal}
        value={value}
        onChange={onChange}
      >
        {optionList.map((radio, index) => (
          <FormControlLabel
            key={index}
            value={radio.value}
            disabled={radio.disabled}
            control={<Radio />}
            label={radio.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

CustomRadio.propTypes = {
  onChange: PropTypes.func,
  horizontal: PropTypes.bool,
  optionList: PropTypes.array,
  value: PropTypes.node,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default CustomRadio;
