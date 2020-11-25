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
import CardHeader from "@material-ui/core/CardHeader";
import { logoImage2 } from "../../assets/img";
import { RESET_PASSWORD } from "../../libs/constants";
import useStyles from "./ResetPassword.styles";
import { RESET_PASSWORD_MSG } from "../../libs/message";
import endPoints from "../../Routes/endpoints";
import {
  resetPasswordAction,
  resetPasswordClearAction,
} from "../../redux/actions/loginActions";
import Loader from "../../components/Loader";
import displayNotification from "../../libs/notification";

function ResetPassword(props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required(RESET_PASSWORD_MSG.REQUIRED),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          RESET_PASSWORD_MSG.CONFIRM_PASSWORD_MIS_MATCH
        )
        .required(RESET_PASSWORD_MSG.REQUIRED),
    }),
    onSubmit: (values) => {
      const tokenArray = props.location.search.split("=");
      const token = tokenArray[1];
      if (token) {
        props.resetPasswordAction(token, {
          password: values.password,
        });
      } else {
        displayNotification(RESET_PASSWORD_MSG.INVALID_URL, "error");
      }
    },
  });

  useEffect(() => {
    const { isSuccess, isError, apiMsg } = props.resetPasswordReducer;
    if (isSuccess) {
      displayNotification(apiMsg, "success");
      if (
        props.loginReducer.user &&
        props.loginReducer.user.isActive === true &&
        props.loginReducer.user.isTempPassword === false &&
        props.loginReducer.user.token
      ) {
        props.history.push(endPoints.dashboard);
      } else {
        props.history.push(endPoints.login);
      }
    } else if (isError) {
      displayNotification(apiMsg, "error");
    }
  }, [props.resetPasswordReducer]);

  return (
    <div className={classes.containerDiv}>
      <Loader loader={props.resetPasswordReducer.isFetching} />
      <div className={classes.wrapper}>
        <img alt="logo" src={logoImage2} className={classes.logoStyle} />
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title={RESET_PASSWORD.title}>
              <Box component="div">
                <img alt="logo" src={logoImage2} />
              </Box>
            </CardHeader>
            <CardContent>
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
                labelText={RESET_PASSWORD.password}
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
                labelText={RESET_PASSWORD.confirmPassword}
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
                {RESET_PASSWORD.resetPaswordBtn}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  loginReducer: PropTypes.object,
  resetPasswordAction: PropTypes.func,
  resetPasswordReducer: PropTypes.object,
  resetPasswordClearAction: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    loginReducer: state.authentication.loginState,
    resetPasswordReducer: state.authentication.resetPassword,
  };
}

export default connect(mapStateToProps, {
  resetPasswordAction,
  resetPasswordClearAction,
})(ResetPassword);
