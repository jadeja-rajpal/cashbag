import React, { useState, useEffect } from "react";
import Dropdown from "common/Dropdown";
import GridContainer from "components/Grid/GridContainer";
import { connect } from "react-redux";
import { getFranchise, clearGetFranchise } from "redux/actions/manageFranchise";
import Loader from "components/Loader";
import GridItem from "components/Grid/GridItem";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import styles from "./styles";
import { franchiseOptionList } from "./constants";

function AGMAssociations(props) {
  const [CDMListing, setCDMListing] = useState(null);
  const {
    classes,
    formik,
    disable,
    handleDropdownChange,
    getFranchiseState,
  } = props;
  useEffect(() => {
    props.getFranchise({ userRole: "cdm" });
  }, []);
  useEffect(() => {
    const { isSuccess, data } = getFranchiseState;
    if (isSuccess) {
      setCDMListing(data.rows);
      props.clearGetFranchise();
    }
  }, [getFranchiseState]);
  return (
    <GridContainer>
      <Loader loader={getFranchiseState.isFetching} />
      <GridItem xs={12}>
        <Typography>Associations</Typography>
      </GridItem>
      <GridItem xs={12} md={6}>
        <Dropdown
          id={"associatedCDM"}
          label={"Associated CDM"}
          value={formik.values.associatedCDM}
          fullWidth
          formControlProps={{
            className: classes.inputStyle,
          }}
          disabled={disable}
          multiple={true}
          options={franchiseOptionList(CDMListing)}
          onChange={(e) => handleDropdownChange(e, "associatedCDM")}
          error={
            formik.touched.associatedCDM &&
            formik.errors &&
            formik.errors.associatedCDM
          }
          helperText={
            formik.touched.associatedCDM &&
            formik.errors &&
            formik.errors.associatedCDM
          }
        />
      </GridItem>
    </GridContainer>
  );
}

AGMAssociations.propTypes = {
  classes: PropTypes.object,
  formik: PropTypes.any,
  disable: PropTypes.bool,
  handleDropdownChange: PropTypes.func,
  getFranchise: PropTypes.func,
  getFranchiseState: PropTypes.object,
  clearGetFranchise: PropTypes.func,
};

const mapStateToProps = ({ manageFranchise }) => ({
  getFranchiseState: manageFranchise.getFranchiseState,
});

export default connect(mapStateToProps, { getFranchise, clearGetFranchise })(
  withStyles(styles)(AGMAssociations)
);
