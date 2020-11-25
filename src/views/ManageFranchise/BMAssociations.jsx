import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFranchise, clearGetFranchise } from "redux/actions/manageFranchise";
import Loader from "components/Loader";
import Dropdown from "common/Dropdown";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import styles from "./styles";
import { franchiseOptionList } from "./constants";

function BMAssociations(props) {
  const [AMListing, setAMListing] = useState(null);
  const {
    classes,
    formik,
    disable,
    handleDropdownChange,
    getFranchiseState,
  } = props;
  useEffect(() => {
    props.getFranchise({ userRole: "am" });
  }, []);
  useEffect(() => {
    const { isSuccess, data } = getFranchiseState;
    if (isSuccess) {
      setAMListing(data.rows);
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
          id={"associatedAM"}
          label={"Associated AM"}
          value={formik.values.associatedAM}
          fullWidth
          formControlProps={{
            className: classes.inputStyle,
          }}
          disabled={disable}
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

BMAssociations.propTypes = {
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
  withStyles(styles)(BMAssociations)
);
