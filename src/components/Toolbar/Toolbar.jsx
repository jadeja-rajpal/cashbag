import React from "react";
import { CSVLink } from "react-csv";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import GridOnIcon from "@material-ui/icons/GridOn";
import FilterListIcon from "@material-ui/icons/FilterList";
import CustomInput from "components/CustomInput/CustomInput";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";
import Button from "components/CustomButtons/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import styles from "./Toolbar.styles";

function Toolbar(props) {
  const {
    classes,
    onClickFilter,
    onClickPrint,
    onClickExport,
    showFilter,
    onSearchClick,
    showPrint,
    showExport,
    xlsData,
    xlsHeaders,
    xlsFileName,
    onSearchChange,
    showSearch,
    searchPlaceholder,
    keyList,
    keyValue,
    onKeyChange,
    extraButtons,
    selectLabel,
    searchValue,
    showSearchDropdown,
  } = props;

  const handlePrint = () => {
    window.print();
    onClickPrint();
  };

  return (
    <Paper elevation={3} className={classes.wrapper}>
      <Grid containter={"true"} className={classes.container}>
        <Grid item xs={4} className={classes.titleContainer}>
          {showSearch && (
            <React.Fragment>
              {showSearchDropdown && (
                <FormControl className={classes.selectWrapper}>
                  <InputLabel id="demo-simple-select-label">
                    {selectLabel}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={keyValue}
                    onChange={onKeyChange}
                    inputProps={{
                      classes: {
                        root: classes.select,
                      },
                    }}
                  >
                    {keyList &&
                      keyList.map((key, index) => (
                        <MenuItem key={index} value={key.value}>
                          {key.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              &nbsp; &nbsp;
              <CustomInput
                formControlProps={{
                  className: `${classes.margin}`,
                }}
                variant="outlined"
                type="search"
                inputProps={{
                  placeholder: searchPlaceholder,
                  inputProps: {
                    "aria-label": "Search",
                    onChange: onSearchChange,
                    value: searchValue,
                  },
                }}
              />
              <Button
                color="primary"
                aria-label="edit"
                justIcon
                round
                onClick={onSearchClick}
              >
                <Search />
              </Button>{" "}
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={8} className={classes.toolContainer}>
          {showFilter && (
            <Tooltip title={"Filter"} arrow>
              <IconButton onClick={onClickFilter}>
                <Badge
                  variant="dot"
                  color="secondary"
                  invisible={!props.filterApplied}
                >
                  <FilterListIcon className={classes.iconStyle} />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          {showPrint && (
            <Tooltip title={"Print"} arrow>
              <IconButton onClick={handlePrint}>
                <PrintIcon className={classes.iconStyle} />
              </IconButton>
            </Tooltip>
          )}
          {showExport && (
            <CSVLink data={xlsData} headers={xlsHeaders} filename={xlsFileName}>
              <Tooltip title={"Export"} arrow>
                <IconButton onClick={onClickExport}>
                  <GridOnIcon className={classes.iconStyle} />
                </IconButton>
              </Tooltip>
            </CSVLink>
          )}
          {extraButtons && extraButtons}
        </Grid>
      </Grid>
    </Paper>
  );
}

Toolbar.propTypes = {
  classes: PropTypes.object,
  onClickFilter: PropTypes.func,
  onClickPrint: PropTypes.func,
  onClickExport: PropTypes.func,
  showFilter: PropTypes.bool,
  showPrint: PropTypes.bool,
  showExport: PropTypes.bool,
  xlsData: PropTypes.array,
  xlsHeaders: PropTypes.array,
  xlsFileName: PropTypes.string,
  onSearchChange: PropTypes.func,
  showSearch: PropTypes.bool,
  onSearchClick: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  keyList: PropTypes.array,
  keyValue: PropTypes.string,
  onKeyChange: PropTypes.func,
  extraButtons: PropTypes.node,
  selectLabel: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  showSearchDropdown: PropTypes.bool,
  filterApplied: PropTypes.bool,
};

Toolbar.defaultProps = {
  showPrint: false,
  showExport: false,
  showFilter: false,
  showSearch: false,
  searchValue: "",
  showSearchDropdown: true,
  xlsFileName: "CashBag.xlsx",
  filterApplied: false,
  onClickPrint: () => {},
};

export default withStyles(styles)(Toolbar);
