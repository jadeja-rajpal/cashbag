import React, { useEffect, useState } from "react";
import Dropdown from "common/Dropdown";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFranchise, clearGetFranchise } from "redux/actions/manageFranchise";
import Loader from "components/Loader";
import styles from "./styles";
import { franchiseOptionList } from "./constants";

function AMAssociations(props) {
  const {
    classes,
    formik,
    disable,
    handleDropdownChange,
    getFranchiseState,
  } = props;
  const [CDMListing, setCDMListing] = useState(null);
  const [BMListing, setBMListing] = useState(null);
  useEffect(() => {
    props.getFranchise({ userRole: "cdm" });
  }, []);
  useEffect(() => {
    const { isSuccess, data } = getFranchiseState;
    if (isSuccess) {
      if (CDMListing) {
        setBMListing(data.rows);
      } else {
        setCDMListing(data.rows);
      }
      props.clearGetFranchise();
    }
  }, [getFranchiseState]);
  useEffect(() => {
    if (CDMListing) {
      props.getFranchise({ userRole: "bm" });
    }
  }, [CDMListing]);
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
      <GridItem xs={12} md={6}>
        <Dropdown
          id={"associatedBM"}
          label={"Associated BM"}
          value={formik.values.associatedBM}
          fullWidth
          formControlProps={{
            className: classes.inputStyle,
          }}
          disabled={disable}
          options={franchiseOptionList(BMListing)}
          onChange={(e) => handleDropdownChange(e, "associatedBM")}
          multiple={true}
          error={
            formik.touched.associatedBM &&
            formik.errors &&
            formik.errors.associatedBM
          }
          helperText={
            formik.touched.associatedBM &&
            formik.errors &&
            formik.errors.associatedBM
          }
        />
      </GridItem>
    </GridContainer>
  );
}

AMAssociations.propTypes = {
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
  withStyles(styles)(AMAssociations)
);
