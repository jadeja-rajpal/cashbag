import React, { useEffect, useState } from "react";
import Breadcrumb from "components/Breadcrumb";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Dropdown from "common/Dropdown";
import Button from "components/CustomButtons/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Loader from "components/Loader";
import displayNotifications from "libs/notification";
import { connect } from "react-redux";
import {
  getFrontendUserDetails,
  clearFrontendUserDetails,
} from "redux/actions/frontendUserActions";
import { postPincode, clearPincodeState } from "redux/actions/getUserData";
import {
  addFranchise,
  clearAddFranchise,
  getFranchiseDetail,
  clearFranchiseDetail,
  updateFranchise,
  clearUpdateFranchise,
} from "redux/actions/manageFranchise";
import endpoints from "Routes/endpoints";
import { MANAGE_FRANCHISE } from "libs/message";
import regex from "libs/regex";
import {
  USER_TYPE_OPTIONS,
  USER_TYPE,
  COMMISSION,
  FRANCHISE_TABS,
} from "./constants";
import styles from "./styles";
import CDMAssociations from "./CDMAssociations";
import AGMAssociations from "./AGMAssociations";
import BMAssociations from "./BMAssociations";
import AMAssociations from "./AMAssociations";

function AddFranchise(props) {
  const { classes, history, match, location } = props;
  const [userIdEdited, setUserIdEdited] = useState(false);
  const [userPincodeEdited, setUserPincodeEdited] = useState(false);
  const [franchisePincodeEdited, setFranchisePincodeEdited] = useState(false);
  const [lowerAssociationsState, setLowerAssociationsState] = useState([]);
  const [disablePayload, setDisablePayload] = useState({
    edit: false,
    view: false,
    userId: false,
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userId: "",
      email: "",
      mobile: "",
      father: "",
      pincode: "",
      address: "",
      city: "",
      cityId: "",
      stateId: "",
      state: "",
      franchiseType: "",
      franchisePin: "",
      franchiseCity: "",
      franchiseCityId: "",
      franchiseState: "",
      franchiseStateId: "",
      franchiseCommission: "",
      associatedAGM: "",
      associatedAM: "",
      associatedCDM: "",
      associatedBM: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      lastName: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      userId: Yup.string().required(MANAGE_FRANCHISE.REQUIRED).min(36).max(36),
      email: Yup.string()
        .required(MANAGE_FRANCHISE.REQUIRED)
        .matches(regex.email, MANAGE_FRANCHISE.EMAIL_INVALID),
      mobile: Yup.string()
        .required(MANAGE_FRANCHISE.REQUIRED)
        .matches(regex.mobileNumber, MANAGE_FRANCHISE.MOBILE_NUMBER),
      father: Yup.string(),
      pincode: Yup.string()
        .required(MANAGE_FRANCHISE.REQUIRED)
        .min(6, MANAGE_FRANCHISE.PINCODE_INVALID)
        .max(6, MANAGE_FRANCHISE.PINCODE_INVALID),
      address: Yup.string(),
      city: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      state: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      franchiseType: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      franchisePin: Yup.string()
        .required(MANAGE_FRANCHISE.REQUIRED)
        .min(6, MANAGE_FRANCHISE.PINCODE_INVALID)
        .max(6, MANAGE_FRANCHISE.PINCODE_INVALID),
      franchiseCity: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      franchiseCommission: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
      associatedAGM: Yup.string().when("franchiseType", {
        is: (franchiseType) => franchiseType === USER_TYPE.CDM,
        then: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
        otherwise: Yup.string(),
      }),
      associatedAM: Yup.string().when("franchiseType", {
        is: (franchiseType) => franchiseType === USER_TYPE.BM,
        then: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
        otherwise: Yup.string(),
      }),
      associatedCDM: Yup.string().when("franchiseType", {
        is: (franchiseType) => franchiseType === USER_TYPE.AM,
        then: Yup.string().required(MANAGE_FRANCHISE.REQUIRED),
        otherwise: Yup.string(),
      }),
      associatedBM: Yup.string(),
    }),
    onSubmit: (values) => {
      let associationPayload = {};
      switch (formik.values.franchiseType) {
        case USER_TYPE.AGM:
          associationPayload = {
            lowerLevelAssociations: formik.values.associatedCDM,
          };
          break;
        case USER_TYPE.CDM:
          associationPayload = {
            associatedWithId: formik.values.associatedAGM,
            lowerLevelAssociations: formik.values.associatedAM,
          };
          break;
        case USER_TYPE.AM:
          associationPayload = {
            associatedWithId: formik.values.associatedCDM,

            lowerLevelAssociations: formik.values.associatedBM,
          };
          break;
        case USER_TYPE.BM:
          associationPayload = {
            associatedWithId: formik.values.associatedAM,
          };
          break;
        default:
          break;
      }
      if (!disablePayload.edit && !disablePayload.view) {
        props.addFranchise({
          userRole: values.franchiseType,
          workPincode: values.franchisePin,
          workStateId: values.franchiseStateId,
          workCityId: values.franchiseCityId,
          workDistrictId: values.franchiseCityId,
          userId: values.userId,
          divisionOfCommission: values.franchiseCommission,
          generalDetails: {
            mobile: values.mobile,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            pincode: `${values.pincode}`,
            stateId: values.stateId,
            cityId: values.cityId,
          },
          ...associationPayload,
        });
      } else if (disablePayload.edit) {
        const addLowerAssociations = [];
        const removedLowerAssociations = [];
        if (associationPayload.lowerLevelAssociations) {
          associationPayload.lowerLevelAssociations.map(
            (lowerAssociationId) => {
              if (!lowerAssociationsState.includes(lowerAssociationId)) {
                addLowerAssociations.push(lowerAssociationId);
              }
              return null;
            }
          );
          lowerAssociationsState.map((lowerAssociationId) => {
            if (
              !associationPayload.lowerLevelAssociations.includes(
                lowerAssociationId
              )
            ) {
              removedLowerAssociations.push(lowerAssociationId);
            }
            return null;
          });
        }
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          pincode: `${values.pincode}`,
          stateId: `${values.stateId}`,
          cityId: `${values.cityId}`,
          id: match.params.franchiseId,
          workPincode: `${values.franchisePin}`,
          workStateId: `${values.franchiseStateId}`,
          workCityId: `${values.franchiseCityId}`,
          workDistrictId: `${values.franchiseCityId}`,
          divisionOfCommission: values.franchiseCommission,
          addLowerAssociations,
          removedLowerAssociations,
          associatedWithId: associationPayload.associatedWithId,
        };
        props.updateFranchise(payload);
      }
    },
  });
  const handleDropdownChange = (e, id) => {
    formik.setFieldValue(id, e.target.value);
    if (id === "franchiseType") {
      switch (e.target.value) {
        case USER_TYPE.AGM:
          formik.setFieldValue("associatedCDM", []);
          break;
        case USER_TYPE.CDM:
          formik.setFieldValue("associatedAGM", "");
          formik.setFieldValue("associatedAM", []);
          break;
        case USER_TYPE.AM:
          formik.setFieldValue("associatedCDM", "");
          formik.setFieldValue("associatedBM", []);
          break;
        case USER_TYPE.BM:
          formik.setFieldValue("associatedAM", "");
          break;
        default:
          break;
      }
      formik.setFieldValue("franchisePin", "");
      formik.setFieldValue("franchiseCity", "");
      formik.setFieldValue("franchiseCommission", COMMISSION[e.target.value]);
    }
  };

  useEffect(() => {
    if (disablePayload.view || disablePayload.edit) {
      switch (formik.values.franchiseType) {
        case USER_TYPE.AGM:
          formik.setFieldValue("associatedCDM", []);
          break;
        case USER_TYPE.CDM:
          formik.setFieldValue("associatedAGM", "");
          formik.setFieldValue("associatedAM", []);
          break;
        case USER_TYPE.AM:
          formik.setFieldValue("associatedCDM", "");
          formik.setFieldValue("associatedBM", []);
          break;
        case USER_TYPE.BM:
          formik.setFieldValue("associatedAM", "");
          break;
        default:
          break;
      }
    }
  }, [formik.values.franchiseType]);

  const checkDisability = (disablityKeys) => {
    let disable = false;
    disablityKeys.map((key) => {
      if (disablePayload[key]) {
        disable = true;
      }
      return null;
    });
    return disable;
  };

  const associations = () => {
    switch (formik.values.franchiseType) {
      case USER_TYPE.CDM:
        return (
          <CDMAssociations
            handleDropdownChange={handleDropdownChange}
            formik={formik}
            disable={checkDisability(["view"])}
          />
        );
      case USER_TYPE.AGM:
        return (
          <AGMAssociations
            handleDropdownChange={handleDropdownChange}
            formik={formik}
            disable={checkDisability(["view"])}
          />
        );
      case USER_TYPE.BM:
        return (
          <BMAssociations
            handleDropdownChange={handleDropdownChange}
            formik={formik}
            disable={checkDisability(["view"])}
          />
        );
      case USER_TYPE.AM:
        return (
          <AMAssociations
            handleDropdownChange={handleDropdownChange}
            formik={formik}
            disable={checkDisability(["view"])}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (match.path === endpoints.viewFranchise(":franchiseId")) {
      setDisablePayload({
        ...disablePayload,
        view: true,
      });
      if (location.state && location.state.userRole) {
        formik.setFieldValue("franchiseType", location.state.userRole);
        props.getFranchiseDetail({
          id: match.params.franchiseId,
          userRole: location.state.userRole,
          getChildren: true,
        });
      }
    } else if (match.path === endpoints.editFranchise(":franchiseId")) {
      setDisablePayload({
        ...disablePayload,
        edit: true,
      });
      if (location.state && location.state.userRole) {
        formik.setFieldValue("franchiseType", location.state.userRole);
        props.getFranchiseDetail({
          id: match.params.franchiseId,
          userRole: location.state.userRole,
          getChildren: true,
        });
      }
    }
    return () => {
      props.clearFrontendUserDetails();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, data } = props.franchiseDetailState;
    if (isSuccess) {
      const lowerAssociations = [];
      data.rows.map((manager) => {
        if (manager["children.id"]) {
          lowerAssociations.push(manager["children.id"]);
        }
        return null;
      });
      setLowerAssociationsState(lowerAssociations);
      formik.setFieldValue("firstName", data.rows[0]["User.firstName"]);
      formik.setFieldValue("lastName", data.rows[0]["User.lastName"]);
      formik.setFieldValue("email", data.rows[0]["User.email"]);
      formik.setFieldValue("pincode", data.rows[0]["User.pincode"]); // not from backend
      formik.setFieldValue("mobile", data.rows[0]["User.mobile"]);
      formik.setFieldValue("stateId", data.rows[0]["User.stateId"]);
      formik.setFieldValue(
        "state",
        props.stateIdList[data.rows[0]["User.stateId"]]
      );
      formik.setFieldValue("cityId", data.rows[0]["User.cityId"]);
      formik.setFieldValue(
        "city",
        props.cityIdList[data.rows[0]["User.cityId"]]
      );
      formik.setFieldValue("userId", data.rows[0].userId);
      formik.setFieldValue("franchiseCityId", data.rows[0].workCityId);
      formik.setFieldValue("franchiseStateId", data.rows[0].workStateId);
      formik.setFieldValue(
        "franchiseCity",
        props.cityIdList[data.rows[0].workCityId]
      );
      formik.setFieldValue("franchisePin", data.rows[0].workPincode);
      formik.setFieldValue(
        "franchiseCommission",
        data.rows[0].divisionOfCommission
      );
      switch (location.state.userRole) {
        case USER_TYPE.AGM:
          formik.setFieldValue("associatedCDM", lowerAssociations);
          break;
        case USER_TYPE.CDM:
          formik.setFieldValue(
            "associatedAGM",
            data.rows[0]["associatedFranchise.id"]
          );
          formik.setFieldValue("associatedAM", lowerAssociations);
          break;
        case USER_TYPE.AM:
          formik.setFieldValue(
            "associatedCDM",
            data.rows[0]["associatedFranchise.id"]
          );
          formik.setFieldValue("associatedBM", lowerAssociations);
          break;
        case USER_TYPE.BM:
          formik.setFieldValue(
            "associatedAM",
            data.rows[0]["associatedFranchise.id"]
          );
          break;
        default:
          break;
      }
      props.clearFranchiseDetail();
    }
  }, [props.franchiseDetailState]);

  useEffect(() => {
    if (
      formik.values.userId &&
      formik.values.userId.length === 36 &&
      userIdEdited
    ) {
      props.getFrontendUserDetails(formik.values.userId);
      setUserIdEdited(false);
    }
  }, [formik.values.userId]);

  useEffect(() => {
    if (
      formik.values.pincode &&
      formik.values.pincode.length === 6 &&
      userPincodeEdited
    ) {
      props.postPincode(formik.values.pincode, "pincode");
      setUserPincodeEdited(false);
    }
  }, [formik.values.pincode]);

  const handleChangeUserId = (e) => {
    setUserIdEdited(true);
    formik.handleChange(e);
  };

  const handleUserPincodeChange = (e) => {
    setUserPincodeEdited(true);
    formik.handleChange(e);
  };

  const handleFranchisePincodeChange = (e) => {
    setFranchisePincodeEdited(true);
    formik.handleChange(e);
  };

  useEffect(() => {
    if (formik.values.franchisePin.length === 6 && franchisePincodeEdited) {
      props.postPincode(formik.values.franchisePin, "franchisePin");
      setFranchisePincodeEdited(false);
    }
  }, [formik.values.franchisePin]);

  useEffect(() => {
    const { isSuccess, data, isError, apiMsg } = props.userDetailState;
    if (isSuccess) {
      formik.setFieldValue("firstName", data.firstName);
      formik.setFieldValue("lastName", data.lastName);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("pincode", data.pincode);
      formik.setFieldValue("mobile", data.mobile);
      formik.setFieldValue("stateId", data.stateId);
      formik.setFieldValue("state", props.stateIdList[data.stateId]);
      formik.setFieldValue("cityId", data.cityId);
      formik.setFieldValue("city", props.cityIdList[data.cityId]);
      props.clearFrontendUserDetails();
    } else if (isError) {
      formik.setFieldValue("firstName", "");
      formik.setFieldValue("lastName", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("pincode", "");
      formik.setFieldValue("mobile", "");
      formik.setFieldValue("stateId", "");
      formik.setFieldValue("state", "");
      formik.setFieldValue("cityId", "");
      formik.setFieldValue("city", "");
      props.clearFrontendUserDetails();
      displayNotifications(apiMsg, "error");
    }
  }, [props.userDetailState]);

  useEffect(() => {
    const { isSuccess, isError, message } = props.updateFranchiseState;
    if (isSuccess) {
      displayNotifications(message, "success");
      history.push(endpoints.manageFranchise, {
        tab: FRANCHISE_TABS[formik.values.franchiseType],
      });
      props.clearUpdateFranchise();
    } else if (isError) {
      displayNotifications(message, "error");
      props.clearUpdateFranchise();
    }
  }, [props.updateFranchiseState]);

  useEffect(() => {
    const { isSuccess, isError, key, data, message } = props.cityStateId;
    if (isSuccess) {
      if (key === "pincode") {
        formik.setFieldValue("stateId", data.stateId);
        formik.setFieldValue("state", props.stateIdList[data.stateId]);
        formik.setFieldValue("cityId", data.cityId);
        formik.setFieldValue("city", props.cityIdList[data.cityId]);
      } else if (key === "franchisePin") {
        formik.setFieldValue("franchiseCityId", data.cityId);
        formik.setFieldValue("franchiseStateId", data.stateId);
        formik.setFieldValue("franchiseCity", props.cityIdList[data.cityId]);
      }
      props.clearPincodeState();
    } else if (isError) {
      displayNotifications(message, "error");
      if (key === "pincode") {
        formik.setFieldValue("stateId", "");
        formik.setFieldValue("state", "");
        formik.setFieldValue("cityId", "");
        formik.setFieldValue("city", "");
      } else if (key === "franchisePin") {
        formik.setFieldValue("franchiseCityId", "");
        formik.setFieldValue("franchiseStateId", "");
        formik.setFieldValue("franchiseCity", "");
      }
      props.clearPincodeState();
    }
  }, [props.cityStateId]);

  useEffect(() => {
    const { isError, message, isSuccess } = props.addFranchiseState;
    if (isError) {
      displayNotifications(message, "error");
      props.clearAddFranchise();
    } else if (isSuccess) {
      displayNotifications(message, "success");
      history.push(endpoints.manageFranchise, {
        tab: FRANCHISE_TABS[formik.values.franchiseType],
      });
      props.clearAddFranchise();
    }
  }, [props.addFranchiseState]);

  return (
    <div className="manage-franchise">
      <Breadcrumb />
      <Loader
        loader={
          props.userDetailState.isFetching ||
          props.cityStateId.isLoading ||
          props.addFranchiseState.isFetching ||
          props.franchiseDetailState.isFetching ||
          props.updateFranchiseState.isFetching
        }
      />
      <Card>
        <CardHeader color="warning">Manage Franchise</CardHeader>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>General Info</Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.userId,
                    onChange: handleChangeUserId,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "edit"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(formik.touched.userId && formik.errors.userId)}
                  id="userId"
                  labelText={"User Id"}
                  helperText={formik.touched.userId && formik.errors.userId}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.firstName,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "userId"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  id="firstName"
                  labelText={"First name"}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.lastName,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "userId"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  id="lastName"
                  labelText={"Last Name"}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.email,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "userId"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  id="email"
                  labelText={"Email"}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.mobile,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: true,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                  id="mobile"
                  labelText={"Mobile Number"}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.father,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "userId"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                  }}
                  error={Boolean(formik.touched.father && formik.errors.father)}
                  id="father"
                  labelText={"Father's Name"}
                  helperText={formik.touched.father && formik.errors.father}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>Address</Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.pincode,
                    onChange: handleUserPincodeChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "userId"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: `${classes.inputStyle}`,
                    required: true,
                  }}
                  error={Boolean(
                    formik.touched.pincode && formik.errors.pincode
                  )}
                  id="pincode"
                  labelText={"Pincode"}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.address,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view", "userId"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                  }}
                  error={Boolean(
                    formik.touched.address && formik.errors.address
                  )}
                  id="address"
                  labelText={"Address"}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.city,
                    disabled: true,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: `${classes.inputStyle}`,
                    required: true,
                  }}
                  id="city"
                  labelText={"City"}
                  error={Boolean(formik.touched.city && formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.state,
                    disabled: true,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: `${classes.inputStyle}`,
                    required: true,
                  }}
                  id="state"
                  labelText={"State"}
                  error={Boolean(formik.touched.state && formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12}>
                <Typography>User Type</Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Dropdown
                  id={"franchiseType"}
                  label={"Franchise Type"}
                  value={formik.values.franchiseType}
                  fullWidth
                  formControlProps={{
                    className: classes.inputStyle,
                    required: true,
                  }}
                  disabled={checkDisability(["view", "edit"])}
                  options={USER_TYPE_OPTIONS}
                  onChange={(e) => handleDropdownChange(e, "franchiseType")}
                  error={
                    formik.touched.franchiseType &&
                    formik.errors &&
                    formik.errors.franchiseType
                  }
                  helperText={
                    formik.touched.franchiseType &&
                    formik.errors &&
                    formik.errors.franchiseType
                  }
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.franchisePin,
                    onChange: handleFranchisePincodeChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(
                    formik.touched.franchisePin && formik.errors.franchisePin
                  )}
                  id="franchisePin"
                  labelText={"Franchise Pincode"}
                  helperText={
                    formik.touched.franchisePin && formik.errors.franchisePin
                  }
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.franchiseCity,
                    disabled: true,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: `${classes.inputStyle}`,
                    required: true,
                  }}
                  id="franchiseCity"
                  labelText={"City"}
                  error={Boolean(
                    formik.touched.franchiseCity && formik.errors.franchiseCity
                  )}
                  helperText={
                    formik.touched.franchiseCity && formik.errors.franchiseCity
                  }
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CustomInput
                  inputProps={{
                    value: formik.values.franchiseCommission,
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    disabled: checkDisability(["view"]),
                  }}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.inputStyle,
                    required: true,
                  }}
                  error={Boolean(
                    formik.touched.franchiseCommission &&
                      formik.errors.franchiseCommission
                  )}
                  id="franchiseCommission"
                  labelText={"Commission"}
                  helperText={
                    formik.touched.franchiseCommission &&
                    formik.errors.franchiseCommission
                  }
                />
              </GridItem>
            </GridContainer>
            {associations()}
            {!disablePayload.view && (
              <React.Fragment>
                <Button
                  onClick={() => {
                    history.push(endpoints.manageFranchise);
                  }}
                >
                  Cancel
                </Button>
                <Button color="warning" type="submit">
                  Submit
                </Button>
              </React.Fragment>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

AddFranchise.propTypes = {
  classes: PropTypes.object,
  getFrontendUserDetails: PropTypes.func,
  userDetailState: PropTypes.object,
  clearFrontendUserDetails: PropTypes.func,
  stateIdList: PropTypes.object,
  cityIdList: PropTypes.object,
  postPincode: PropTypes.func,
  cityStateId: PropTypes.object,
  clearPincodeState: PropTypes.func,
  addFranchise: PropTypes.func,
  addFranchiseState: PropTypes.object,
  clearAddFranchise: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  getFranchiseDetail: PropTypes.func,
  location: PropTypes.object,
  franchiseDetailState: PropTypes.object,
  clearFranchiseDetail: PropTypes.func,
  updateFranchise: PropTypes.func,
  clearUpdateFranchise: PropTypes.func,
  updateFranchiseState: PropTypes.object,
};

const mapStateToProps = ({
  frontendUsersReducer,
  userData,
  manageFranchise,
}) => ({
  userDetailState: { ...frontendUsersReducer.frontendUserDetail },
  stateIdList: { ...frontendUsersReducer.statesCitiesListState.data.state },
  cityIdList: { ...frontendUsersReducer.statesCitiesListState.data.city },
  addFranchiseState: { ...manageFranchise.addFranchiseState },
  cityStateId: { ...userData.postPincodeState },
  franchiseDetailState: { ...manageFranchise.franchiseDetailState },
  updateFranchiseState: { ...manageFranchise.updateFranchiseState },
});

export default connect(mapStateToProps, {
  getFrontendUserDetails,
  clearFrontendUserDetails,
  postPincode,
  addFranchise,
  clearPincodeState,
  clearAddFranchise,
  getFranchiseDetail,
  clearFranchiseDetail,
  updateFranchise,
  clearUpdateFranchise,
})(withStyles(styles)(AddFranchise));
