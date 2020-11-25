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
import { FORGOT_PASSWORD } from "../../libs/constants";
import useStyles from "./ForgotPassword.styles";
import {
  forgotPasswordAction,
  forgotPasswordClearAction,
} from "../../redux/actions/loginActions";
import { FORGET_PASSOWRD_MSG } from "../../libs/message";
import Loader from "../../components/Loader";
import displayNotification from "../../libs/notification";

function ForgotPassword(props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required(FORGET_PASSOWRD_MSG.REQUIRED)
        .email(FORGET_PASSOWRD_MSG.EMAIL_INVALID),
    }),
    onSubmit: (values) => {
      props.forgotPasswordAction({
        email: values.email,
      });
    },
  });

  useEffect(() => {
    const { isSuccess, isError, apiMsg } = props.forgotPasswordReducer;
    if (isSuccess) {
      displayNotification(apiMsg, "success");
    } else if (isError) {
      displayNotification(apiMsg, "error");
    }
  }, [props.forgotPasswordReducer]);

  return (
    <div className={classes.containerDiv}>
      <Loader loader={props.forgotPasswordReducer.isFetching} />
      <div className={classes.wrapper}>
        <img alt="logo" src={logoImage2} className={classes.logoStyle} />
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader
              className={classes.header}
              title={FORGOT_PASSWORD.forgot_password}
            >
              <Box component="div">
                <img alt="logo" src={logoImage2} />
              </Box>
            </CardHeader>
            <CardContent>
              <CustomInput
                inputProps={{
                  value: formik.values.email,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                }}
                id="email"
                type="email"
                formControlProps={{
                  fullWidth: true,
                }}
                error={
                  formik.touched.email && formik.errors && formik.errors.email
                }
                labelText={FORGOT_PASSWORD.registeredEmail}
                helperText={
                  formik.touched.email && formik.errors && formik.errors.email
                }
              />
            </CardContent>
            <CardActions>
              <Button
                color="warning"
                className={classes.loginBtn}
                onClick={formik.handleSubmit}
              >
                {FORGOT_PASSWORD.link}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  forgotPasswordAction: PropTypes.func,
  forgotPasswordReducer: PropTypes.object,
  forgotPasswordClearAction: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    forgotPasswordReducer: state.authentication.forgotPassword,
  };
}

export default connect(mapStateToProps, {
  forgotPasswordAction,
  forgotPasswordClearAction,
})(ForgotPassword);
