import React, { useEffect, useState } from "react";
import Dropdown from "common/Dropdown";
import { connect } from "react-redux";
import { getFranchise, clearGetFranchise } from "redux/actions/manageFranchise";
import Loader from "components/Loader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import styles from "./styles";
import { franchiseOptionList } from "./constants";

function CDMAssociations(props) {
  const {
    classes,
    formik,
    disable,
    handleDropdownChange,
    getFranchiseState,
  } = props;
  const [AGMListing, setAGMListing] = useState(null);
  const [AMListing, setAMListing] = useState(null);
  useEffect(() => {
    props.getFranchise({ userRole: "agm" });
  }, []);
  useEffect(() => {
    const { isSuccess, data } = getFranchiseState;
    if (isSuccess) {
      if (AGMListing) {
        setAMListing(data.rows);
      } else {
        setAGMListing(data.rows);
      }
      props.clearGetFranchise();
    }
  }, [getFranchiseState]);
  useEffect(() => {
    if (AGMListing) {
      props.getFranchise({ userRole: "am" });
    }
  }, [AGMListing]);
  return (
    <GridContainer>
      <Loader loader={getFranchiseState.isFetching} />
      <GridItem xs={12}>
        <Typography>Associations</Typography>
      </GridItem>
      <GridItem xs={12} md={6}>
        <Dropdown
          id={"associatedAGM"}
          label={"Associated AGM"}
          value={formik.values.associatedAGM}
          fullWidth
          formControlProps={{
            className: classes.inputStyle,
          }}
          disabled={disable}
          options={franchiseOptionList(AGMListing)}
          onChange={(e) => handleDropdownChange(e, "associatedAGM")}
          error={
            formik.touched.associatedAGM &&
            formik.errors &&
            formik.errors.associatedAGM
          }
          helperText={
            formik.touched.associatedAGM &&
            formik.errors &&
            formik.errors.associatedAGM
          }
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <Dropdown
          id={"associatedAM"}
          label={"Associated AM"}
          value={formik.values.associatedAM}
          fullWidth
          formControlProps={{
            className: classes.inputStyle,
          }}
          disabled={disable}
          multiple={true}
          options={franchiseOptionList(AMListing)}
          onChange={(e) => handleDropdownChange(e, "associatedAM")}
          error={
            formik.touched.associatedAM &&
            formik.errors &&
            formik.errors.associatedAM
          }
          helperText={
            formik.touched.associatedAM &&
            formik.errors &&
            formik.errors.associatedAM
          }
        />
      </GridItem>
    </GridContainer>
  );
}

CDMAssociations.propTypes = {
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
  withStyles(styles)(CDMAssociations)
);
