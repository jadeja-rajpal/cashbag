import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "components/CustomInput/CustomInput";
import { Card, Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "components/CustomButtons/Button";
import {
  changePassword,
  clearChangePasswordState,
} from "redux/actions/changePassowrd";
import displayNotifications from "libs/notification";
import routes from "Routes/endpoints";
import { Redirect } from "react-router-dom";
import { CHANGE_PASSWORD } from "../../libs/constants";
import useStyles from "../ResetPassword/ResetPassword.styles";
import { CHANGE_PASSWORD_MSG } from "../../libs/message";
import Loader from "../../components/Loader";

function ChangePassword(props) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(CHANGE_PASSWORD_MSG.REQUIRED),
      password: Yup.string().required(CHANGE_PASSWORD_MSG.REQUIRED), // TODO: once login pr merge define error msg in constant file
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          CHANGE_PASSWORD_MSG.PASSWORD_MIS_MATCH
        )
        .required(CHANGE_PASSWORD_MSG.REQUIRED),
    }),
    onSubmit: (values) => {
      props.changePassword({
        id: localStorage.getItem("adminId"),
        password: values.oldPassword,
        newPassword: values.password,
      });
    },
  });

  useEffect(() => {
    return () => {
      props.clearChangePasswordState();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, message, isError } = props.changePasswordState;
    if (isSuccess) {
      displayNotifications(message, "success");
    }
    if (isError) {
      displayNotifications(message, "error");
    }
  }, [props.changePasswordState]);

  return (
    <div>
      {props.changePasswordState.isSuccess && (
        <Redirect to={routes.dashboard} />
      )}
      <Loader loader={props.changePasswordState.isLoading} />
      <div className={classes.wrapper}>
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardContent>
              <Box className={classes.changePasswordTitle}>
                {CHANGE_PASSWORD.title}
              </Box>
              <CustomInput
                inputProps={{
                  value: formik.values.oldPassword,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  type: "password",
                }}
                id="oldPassword"
                formControlProps={{
                  fullWidth: true,
                }}
                error={Boolean(
                  formik.touched.oldPassword && formik.errors.oldPassword
                )}
                labelText={CHANGE_PASSWORD.oldPassword}
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
              />
              <CustomInput
                inputProps={{
                  value: formik.values.password,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  type: "password",
                }}
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                labelText={CHANGE_PASSWORD.newPassword}
                helperText={formik.touched.password && formik.errors.password}
              />
              <CustomInput
                inputProps={{
                  value: formik.values.confirmPassword,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  type: "password",
                }}
                id="confirmPassword"
                formControlProps={{
                  fullWidth: true,
                }}
                error={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors &&
                    formik.errors.confirmPassword
                )}
                labelText={CHANGE_PASSWORD.confirmPassword}
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors &&
                  formik.errors.confirmPassword
                }
              />
            </CardContent>
            <CardActions>
              <Button
                color="warning"
                className={classes.loginBtn}
                onClick={formik.handleSubmit}
              >
                {CHANGE_PASSWORD.saveBtn}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
}

ChangePassword.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  changePassword: PropTypes.func,
  changePasswordState: PropTypes.object,
  clearChangePasswordState: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    changePasswordState: state.changePassword.changePasswordState,
  };
}

export default connect(mapStateToProps, {
  changePassword,
  clearChangePasswordState,
})(ChangePassword);
