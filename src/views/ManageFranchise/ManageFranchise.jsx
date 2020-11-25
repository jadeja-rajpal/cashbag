import React, { useEffect } from "react";
import CustomTabs from "components/CustomTabs/CustomTabs";
import Button from "components/CustomButtons/Button";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import endpoints from "Routes/endpoints";
import { Link } from "react-router-dom";
import Breadcrumb from "components/Breadcrumb";
import styles from "./styles";
import CDMListing from "./CDMListing";
import AGMListing from "./AGMListing";
import AMListing from "./AMListing";
import BMListing from "./BMListing";

function ManageFranchise(props) {
  const { classes, location, history } = props;
  useEffect(() => {
    // TODO: to be implemented
  }, []);

  const redirect = (route, userRole) => {
    history.push(route, { userRole });
  };

  return (
    <div>
      <Breadcrumb />
      <CustomTabs
        headerColor="primary"
        defaultTab={location.state ? location.state.tab : 0}
        extraButtons={
          <Link to={endpoints.addFranchise}>
            <Button className={classes.addButton}>Add New</Button>
          </Link>
        }
        tabs={[
          {
            tabName: "AGM",
            tabContent: <AGMListing redirect={redirect} />,
          },
          {
            tabName: "CDM",
            tabContent: <CDMListing redirect={redirect} />,
          },
          {
            tabName: "AM",
            tabContent: <AMListing redirect={redirect} />,
          },
          {
            tabName: "BM",
            tabContent: <BMListing redirect={redirect} />,
          },
        ]}
      />
    </div>
  );
}

ManageFranchise.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(ManageFranchise);
