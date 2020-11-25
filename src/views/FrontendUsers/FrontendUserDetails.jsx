import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import avatar from "assets/img/faces/marc.jpg";
import UserProfile from "../../components/UserProfile";
import { USER_PROFILE_DUMMY_DATA } from "./constant";
import BreadCrumb from "../../components/Breadcrumb";

function FrontendUserDetails() {
  return (
    <div>
      <BreadCrumb />
      <br />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <UserProfile
            userInfo={USER_PROFILE_DUMMY_DATA.userInfo}
            kycInfo={USER_PROFILE_DUMMY_DATA.kycInfo}
            cardInfo={USER_PROFILE_DUMMY_DATA.cardInfo}
            img={avatar}
            name={"Rajesh Verma"}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          {"TODO details"}
        </GridItem>
      </GridContainer>
    </div>
  );
}

FrontendUserDetails.propTypes = {
  onClickBtn: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {})(FrontendUserDetails);
