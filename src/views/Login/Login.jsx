import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { Card, Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import { logoImage2 } from "../../assets/img";
import { LOGIN, FORGOT_PASSWORD } from "../../libs/constants";
import { LOGIN_MSG } from "../../libs/message";
import loginAction, {
  verifyOtpAction,
  verifyOtpClearAction,
  resendOtpAction,
  resendOtpClearAction,
} from "../../redux/actions/loginActions";
import useStyles from "./Login.styles";
import OTPInput from "../../layouts/OTPInput";
import { setToken } from "../../api/helperFunction";
import endPoints from "../../Routes/endpoints";
import Loader from "../../components/Loader";
import displayNotification from "../../libs/notification";

const Login = (props) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [verification, setVerification] = useState(false);
  const [resetTempPassword, setResetTempPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required(LOGIN_MSG.REQUIRED)
        .email(LOGIN_MSG.EMAIL_INVALID),
      password: Yup.string().required(LOGIN_MSG.REQUIRED),
    }),
    onSubmit: (values) => {
      props.loginAction({
        email: values.username,
        password: values.password,
        deviceId: "`1234567890",
      }); // TODO remove device id once changes done in api
    },
  });

  useEffect(() => {
    return () => {
      props.verifyOtpClearAction();
      props.resendOtpClearAction();
    };
  }, []);

  useEffect(() => {
    if (
      props.loginReducer.isSuccess &&
      (!props.loginReducer.hasVerified || props.loginReducer.isTempPassword)
    ) {
      setVerification(true);
    } else if (props.loginReducer.isSuccess && props.loginReducer.hasVerified) {
      if (
        props.loginReducer.user &&
        props.loginReducer.user.isActive &&
        props.loginReducer.user.token
      ) {
        setToken(props.loginReducer.user.token);
        localStorage.setItem("adminId", props.loginReducer.user.id);
        displayNotification(props.loginReducer.apiMsg, "success");
        setRedirect(true); // home when token recieved
      }
    } else if (props.loginReducer.isError) {
      displayNotification(props.loginReducer.apiMsg, "error");
    }
  }, [props.loginReducer]);

  useEffect(() => {
    const { isSuccess, isError, apiMsg } = props.verifyOtpReducer;
    if (isSuccess) {
      if (
        props.loginReducer.user &&
        props.loginReducer.user.isActive &&
        props.loginReducer.user.token
      ) {
        setToken(props.loginReducer.user.token);
        displayNotification(apiMsg, "success");
      }
      if (
        props.loginReducer.isActive === false &&
        props.loginReducer.isTempPassword === true
      ) {
        setResetTempPassword(true);
      }
    } else if (isError) {
      displayNotification(apiMsg, "error");
    }
  }, [props.verifyOtpReducer]);

  useEffect(() => {
    const { isSuccess, isError, apiMsg } = props.resendOtpReducer;
    if (isSuccess) {
      displayNotification(apiMsg, "success");
    } else if (isError) {
      displayNotification(apiMsg, "error");
    }
  }, [props.resendOtpReducer]);

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleOtpVerification = () => {
    const payload = {
      id: props.loginReducer.user.id,
      otp,
      journeyType: LOGIN.journeyType,
      fcmToken: "",
    };
    props.verifyOtpAction(payload);
  };

  if (redirect) {
    return <Redirect to={endPoints.dashboard} />;
  }

  if (resetTempPassword) {
    return (
      <Redirect
        to={`${endPoints.resetPassword}?token=${props.loginReducer.user.token}`}
      />
    );
  }

  return (
    <>
      <Loader
        loader={
          props.loginReducer.isFetching ||
          props.verifyOtpReducer.isFetching ||
          props.resendOtpReducer.isFetching
        }
      />
      {verification ? (
        <OTPInput
          length={4}
          time={120}
          onResendClick={() => props.resendOtpAction()}
          onChange={handleOTPChange}
          verifyOtp={handleOtpVerification}
        />
      ) : (
        <div className={classes.containerDiv}>
          <div className={classes.wrapper}>
            <img alt="logo" src={logoImage2} className={classes.logoStyle} />
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <Card className={classes.card}>
                <CardHeader
                  className={classes.header}
                  title={`${LOGIN.portal} ${LOGIN.login}`}
                >
                  <Box component="div">
                    <img alt="logo" src={logoImage2} />
                  </Box>
                </CardHeader>
                <CardContent className={classes.contentWrapper}>
                  <div>
                    <CustomInput
                      inputProps={{
                        value: formik.values.username,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      error={
                        formik.touched &&
                        formik.touched.username &&
                        formik.errors.username
                      }
                      id="username"
                      type="email"
                      labelText={LOGIN.username}
                      helperText={
                        formik.touched &&
                        formik.touched.username &&
                        formik.errors.username
                      }
                    />
                    <CustomInput
                      inputProps={{
                        value: formik.values.password,
                        onChange: formik.handleChange,
                        onBlur: formik.handleBlur,
                        type: "password",
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      error={
                        formik.touched.password &&
                        formik.errors &&
                        formik.errors.password
                      }
                      id="password"
                      labelText={LOGIN.password}
                      helperText={
                        formik.touched.password &&
                        formik.errors &&
                        formik.errors.password
                      }
                    />
                  </div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    color="warning"
                    className={classes.loginBtn}
                    type="submit"
                  >
                    {LOGIN.login}
                  </Button>
                  <div>
                    <a href="/forgot-password">
                      {FORGOT_PASSWORD.forgot_password}
                    </a>
                  </div>
                </CardActions>
              </Card>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

Login.propTypes = {
  loggedIn: PropTypes.bool,
  loginAction: PropTypes.func,
  loginReducer: PropTypes.object,
  verifyOtpAction: PropTypes.func,
  resendOtpAction: PropTypes.func,
  resendOtpReducer: PropTypes.object,
  verifyOtpReducer: PropTypes.object,
  verifyOtpClearAction: PropTypes.func,
  resendOtpClearAction: PropTypes.func,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    loginReducer: state.authentication.loginState,
    resendOtpReducer: state.authentication.resendOtpState,
    verifyOtpReducer: state.authentication.verifyOtpState,
  };
}

export default connect(mapStateToProps, {
  loginAction,
  verifyOtpAction,
  resendOtpAction,
  verifyOtpClearAction,
  resendOtpClearAction,
})(Login);
