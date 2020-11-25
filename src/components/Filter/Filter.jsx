import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, Divider } from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import CustomInput from "../CustomInput/CustomInput";
import DropDown from "../../common/Dropdown";
import styles from "./Filter.styles";

const useStyles = makeStyles(styles);

/**
 *Pass array of objects in columns
 */
function Filter(props) {
  const classes = useStyles();
  const [dateError, setDateError] = useState("");

  const renderDropDown = (column) => {
    return (
      <div>
        <DropDown
          label={column.label}
          options={column.options}
          onChange={column.onChangeDropDown}
          value={column.selectedDropDown}
          isError={column.isError}
          errorMsg={column.errorMsg}
        />
      </div>
    );
  };

  const renderInputBox = (column) => (
    <div>
      <CustomInput
        inputProps={{
          value: column.password,
          onChange: column.handleChange,
          onBlur: column.handleBlur,
          type: column.type ? column.type : "string",
        }}
        formControlProps={{
          fullWidth: true,
        }}
        error={column.error}
        labelText={column.label}
        helperText={column.helperText}
      />
    </div>
  );

  /**
   * TODO multiselect function
   */
  const renderMultiDropDowns = () => (
    <>
      <Box>Multi Select</Box>
    </>
  );

  // TODO: Checkbox
  const renderCheckBox = () => {};

  const handleDateChange = (
    e,
    parentFunction,
    type,
    startDateValue,
    endDateValue
  ) => {
    if (type === "start") {
      if (endDateValue) {
        if (e.target.value > endDateValue) {
          setDateError("Invalid date range");
          setTimeout(() => {
            setDateError("");
          }, 6000);
        } else {
          setDateError("");
          parentFunction(e);
        }
      } else {
        setDateError("");
        parentFunction(e);
      }
    }
    if (type === "end") {
      if (startDateValue) {
        if (e.target.value < startDateValue) {
          setDateError("Invalid date range");
          setTimeout(() => {
            setDateError("");
          }, 6000);
        } else {
          setDateError("");
          parentFunction(e);
        }
      } else {
        setDateError("");
        parentFunction(e);
      }
    }
  };

  const renderDateRange = (column) => {
    return (
      <Box display="flex" flexDirection="column">
        <Box className={classes.dateRangeWrapper}>
          <Box className={classes.dateWrapper}>
            <Typography>{column.startDateLabel}</Typography>
            <TextField
              type={"date"}
              onChange={(e) =>
                handleDateChange(
                  e,
                  column.startDateChange,
                  "start",
                  column.startDateValue,
                  column.endDateValue
                )
              }
              value={column.startDateValue}
            />
          </Box>
          <Box className={classes.dateWrapper}>
            <Typography>{column.endDateLabel}</Typography>
            <TextField
              type={"date"}
              onChange={(e) =>
                handleDateChange(
                  e,
                  column.endDateChange,
                  "end",
                  column.startDateValue,
                  column.endDateValue
                )
              }
              value={column.endDateValue}
            />
          </Box>
        </Box>
        {dateError && (
          <Typography className={classes.filterError}>{dateError}</Typography>
        )}
      </Box>
    );
  };

  const renderFormData = (column) => {
    switch (column.type) {
      case "Checkbox":
        return renderCheckBox(column);
      case "Dropdown":
        return renderDropDown(column);
      case "RenderMultiDropDowns":
        return renderMultiDropDowns(column);
      case "Input":
        return renderInputBox(column);
      case "DateRange":
        return renderDateRange(column);
      default:
        return null;
    }
  };

  const renderBody = (columns) => {
    return columns.map((column, index) => (
      <div key={index} className="filter-column">
        {renderFormData(column)}
      </div>
    ));
  };

  const { columns, showReset, filterBodyHeight } = props;
  return (
    <Modal
      open={true}
      onClose={props.closeFilter}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box className={classes.paper}>
          <Box>
            <Box className={classes.header}>
              <Typography
                className={classes.title}
                key="filter title"
                color="textPrimary"
              >
                {props.headerTitle}
              </Typography>
            </Box>
            <Divider />
            <Box mt={2} mb={2} ml={1.2} mr={1.2}>
              <div className={`filter-body ${filterBodyHeight}`}>
                {renderBody(columns)}
              </div>
              <Box className={classes.footer}>
                {showReset && (
                  <Button onClick={props.resetFilter}>
                    {props.resetBtnTxt}
                  </Button>
                )}
                <Button color="warning" onClick={props.applyFilter}>
                  {props.saveBtnTxt}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

Filter.propTypes = {
  headerTitle: PropTypes.string,
  columns: PropTypes.array,
  resetFilter: PropTypes.func,
  applyFilter: PropTypes.func,
  closeFilter: PropTypes.func,
  showReset: PropTypes.bool,
  resetButtonName: PropTypes.string,
  applyButtonName: PropTypes.string,
  filterBodyHeight: PropTypes.string,
  resetBtnTxt: PropTypes.string,
  saveBtnTxt: PropTypes.string,
};

Filter.defaultProps = {
  headerTitle: "Filter",
  columns: [],
  showReset: true,
  resetBtnTxt: "Reset",
  saveBtnTxt: "Apply",
};

export default Filter;
